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

export interface NodeRecordProps<M extends {service?: string, ns?: string}> {
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
};

export const makeNodeRecord = <M extends {service?: string, ns?: string}>(node: RawNodeRecordProps): NodeRecord<M> => {
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
    parent: node.parent ? makeNodeRecord(node.parent) : null,
    childrenList: List(node.childrenList.map(makeNodeRecord)),
    sourcesList: List(node.sourcesList.map(makeNodeRecord)),
    targetsList: List(node.targetsList.map(makeNodeRecord)),
    geometry: new GraphPointRecord(node.geometry),
    metadata: node.metadata,
  });
}

export class NodeRecord<M extends {service?: string, ns?: string}> extends Record(defaultNodeRecordProps) implements Node {

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

  public getParent(): Node | null {
    return this.parent;
  }

  public getChildren(): List<NodeRecord<M>> {
    return this.childrenList;
  }

  public getSources(): List<NodeRecord<M>> {
    return this.sourcesList;
  }

  public getTargets(): List<NodeRecord<M>> {
    return this.targetsList;
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

  public getFullQualifiedName(): string {
    const meta = this.getParsedMetadata();

    let fqcn = '';

    if(meta?.service) {
      fqcn += names(meta.service).className + '.';
    }

    if(meta?.ns) {
      fqcn += meta.ns + '.';
    }

    return `${fqcn}.${names(this.getName()).className}`;
  }

  public withChildren(childrenList: List<Node>): Node {
    return this.set('childrenList', childrenList as List<NodeRecord<M>>);
  }

  public withSources(sourcesList: List<Node>): Node {
    return this.set('sourcesList', sourcesList as List<NodeRecord<M>>);
  }

  public withTargets(targetsList: List<Node>): Node {
    return this.set('targetsList', targetsList as List<NodeRecord<M>>);
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
