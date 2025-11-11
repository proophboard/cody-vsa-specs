import { List, Record } from 'immutable';
import { type GraphPoint, type Node, type NodeDescription, type NodeId, type NodeLink, type NodeName, type NodeTag, NodeType, type RawNodeRecordProps } from '@proophboard/cody-types';
import { SyncedNodesMap } from "../utils/synced-nodes-map.js";
export type NodeRecordMetadata = {
    service?: string;
    ns?: string;
};
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
export declare const makeNodeRecord: <M extends NodeRecordMetadata>(node: RawNodeRecordProps, nodesMap: SyncedNodesMap) => NodeRecord<M>;
export declare const makeNodeRecordFromNode: <M extends NodeRecordMetadata>(node: Node, nodesMap: SyncedNodesMap) => NodeRecord<M>;
declare const NodeRecord_base: Record.Factory<NodeRecordProps<any>>;
export declare class NodeRecord<M extends NodeRecordMetadata> extends NodeRecord_base implements Node {
    private cachedMetadata;
    getId(): NodeId;
    getName(): NodeName;
    getDescription(): NodeDescription;
    getType(): NodeType;
    getLink(): NodeLink;
    getTags(): List<NodeTag>;
    isLayer(): boolean;
    isDefaultLayer(): boolean;
    getParent<PM extends NodeRecordMetadata>(): NodeRecord<PM> | null;
    getChildren<CM extends NodeRecordMetadata>(): List<NodeRecord<CM>>;
    getSources<SM extends NodeRecordMetadata>(): List<NodeRecord<SM>>;
    getTargets<TM extends NodeRecordMetadata>(): List<NodeRecord<TM>>;
    getGeometry(): GraphPoint;
    getMetadata(): string | null;
    getParsedMetadata(): M | null;
    getFullQualifiedName(defaultSystemName: string): string;
    withChildren(childrenList: List<Node>): Node;
    withSources(sourcesList: List<Node>): Node;
    withTargets(targetsList: List<Node>): Node;
}
export {};
//# sourceMappingURL=node-record.d.ts.map