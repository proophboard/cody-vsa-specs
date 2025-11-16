import { List, Record } from 'immutable';
import {
  type GraphPoint, GraphPointRecord,
  type Node,
  type NodeDescription,
  type NodeId,
  type NodeLink,
  type NodeName,
  type NodeTag,
  NodeType,
  type RawNodeRecordProps,
} from '@proophboard/cody-types';
import {fromJSON} from "../utils/json.js";
import {names} from "../utils/names.js";
import {SyncedNodesMap} from "../utils/synced-nodes-map.js";

export type NodeRecordMetadata = {service?: string, ns?: string};

export interface NodeRecordProps<M extends NodeRecordMetadata> {
  id: NodeId;
  name: NodeName;
  description: NodeDescription;
  type: NodeType;
  link: NodeLink;
  tags: List<NodeTag>;
  layer: boolean;
  defaultLayer: boolean;
  parent: Node | null;
  childrenList: List<NodeRecord<M>>;
  sourcesList: List<NodeRecord<M>>;
  targetsList: List<NodeRecord<M>>;
  geometry: GraphPoint;
  metadata: string | null;
  nodesMap: SyncedNodesMap;
}

const defaultNodeRecordProps: NodeRecordProps<any> = {
  id: '',
  name: '',
  description: '',
  type: NodeType.misc,
  link: '',
  tags: List(),
  layer: false,
  defaultLayer: false,
  parent: null,
  childrenList: List(),
  sourcesList: List(),
  targetsList: List(),
  geometry: { x: 0, y: 0 },
  metadata: null,
  nodesMap: null as unknown as SyncedNodesMap,
};

export const makeNodeRecord = <M extends NodeRecordMetadata>(node: RawNodeRecordProps, nodesMap: SyncedNodesMap): NodeRecord<M> => {
  const metadata = parseRawMetadataToJsonIfPossible<{$nodeName?: string, $nodeType?: NodeType}>(node) || {};

  return new NodeRecord({
    id: node.id,
    name: metadata.$nodeName || node.name,
    description: node.description,
    type: metadata.$nodeType || node.type,
    link: node.link || '',
    tags: List(node.tags),
    layer: node.layer,
    defaultLayer: node.defaultLayer,
    parent: node.parent ? makeNodeRecord(node.parent, nodesMap) : null,
    childrenList: List(node.childrenList.map(n => makeNodeRecord(n, nodesMap))),
    sourcesList: List(node.sourcesList.map(n => makeNodeRecord(n, nodesMap))),
    targetsList: List(node.targetsList.map(n => makeNodeRecord(n, nodesMap))),
    geometry: new GraphPointRecord(node.geometry),
    metadata: node.metadata,
    nodesMap,
  });
}

export const makeNodeRecordFromNode = <M extends NodeRecordMetadata>(node: Node, nodesMap: SyncedNodesMap): NodeRecord<M> => {
  if(node instanceof NodeRecord) {
    return node;
  }

  const metadata = parseRawMetadataToJsonIfPossible<{$nodeName?: string, $nodeType?: NodeType}>({"metadata": node.getMetadata()}) || {};

  return new NodeRecord({
    id: node.getId(),
    name: metadata.$nodeName || node.getName(),
    description: node.getDescription(),
    type: metadata.$nodeType || node.getType(),
    link: node.getLink() || '',
    tags: node.getTags(),
    layer: node.isLayer(),
    defaultLayer: node.isDefaultLayer(),
    parent: node.getParent() ? makeNodeRecordFromNode(node.getParent()!, nodesMap) : null,
    childrenList: node.getChildren().map(n => makeNodeRecordFromNode(n, nodesMap)),
    sourcesList: node.getSources().map(n => makeNodeRecordFromNode(n, nodesMap)),
    targetsList: node.getTargets().map(n => makeNodeRecordFromNode(n, nodesMap)),
    geometry: node.getGeometry(),
    metadata: node.getMetadata(),
    nodesMap,
  });
}

export class NodeRecord<M extends NodeRecordMetadata> extends Record(defaultNodeRecordProps) implements Node {

  private cachedMetadata: M | null | undefined = undefined;

  public getId(): NodeId {
    return this.id;
  }

  public getName(): NodeName {
    return this.name;
  }

  public getDescription(): NodeDescription {
    return this.description;
  }

  public getType(): NodeType {
    return this.type;
  }

  public getLink(): NodeLink {
    return this.link;
  }

  public getTags(): List<NodeTag> {
    return this.tags;
  }

  public isLayer(): boolean {
    return this.layer;
  }

  public isDefaultLayer(): boolean {
    return this.defaultLayer;
  }

  public getParent<PM extends NodeRecordMetadata>(): NodeRecord<PM> | null {
    if(!this.parent) {
      return null;
    }

    return this.nodesMap.get<PM>(this.parent.getId()) || null;
  }

  public getChildren<CM extends NodeRecordMetadata>(): List<NodeRecord<CM>> {
    return this.childrenList
      .map(n => this.nodesMap.get<CM>(n.getId()))
      .filter(n => !!n);
  }

  public getSources<SM extends NodeRecordMetadata>(): List<NodeRecord<SM>> {
    return this.sourcesList
      .map(n => this.nodesMap.get<SM>(n.getId()))
      .filter(n => !!n);
  }

  public getTargets<TM extends NodeRecordMetadata>(): List<NodeRecord<TM>> {
    return this.targetsList
      .map(n => this.nodesMap.get<TM>(n.getId()))
      .filter(n => !!n);
  }

  public getGeometry(): GraphPoint {
    return this.geometry;
  }

  public getMetadata(): string | null {
    return this.metadata;
  }

  public getParsedMetadata(): M | null {
    if(typeof this.cachedMetadata === "undefined") {
      const parsedMeta = parseRawMetadataToJsonIfPossible<M>({metadata: this.getMetadata()});

      this.cachedMetadata = parsedMeta || null;
    }

    return this.cachedMetadata;
  }

  public getFullQualifiedName(defaultSystemName: string): string {
    const meta = this.getParsedMetadata();

    let fqcn = '';

    if(meta?.service) {
      fqcn += names(meta.service).className + '.';
    }

    if(meta?.ns) {
      fqcn += meta.ns + '.';
    }

    if(fqcn === "") {
      fqcn = defaultSystemName + '.';
    }

    return `${fqcn}${names(this.getName()).className}`;
  }

  public withChildren(childrenList: List<Node>): Node {
    return this.set('childrenList', childrenList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
  }

  public withSources(sourcesList: List<Node>): Node {
    return this.set('sourcesList', sourcesList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
  }

  public withTargets(targetsList: List<Node>): Node {
    return this.set('targetsList', targetsList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
  }
}

const parseRawMetadataToJsonIfPossible = <T>(node: Partial<RawNodeRecordProps>): T | undefined => {
  if(!node.metadata) {
    return;
  }

  try {
    const meta = fromJSON(node.metadata);

    if(meta) {
      return meta as T;
    }
  } catch (e) {
    return;
  }
}
