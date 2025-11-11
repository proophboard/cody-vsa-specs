import { type NodeRecord, type NodeRecordMetadata } from "../proophboard/node-record.js";
import { type Node, type NodeId } from "@proophboard/cody-types";
import { Map } from "immutable";
export type InformationTypeRegistry = {
    [typeFQCN: string]: NodeRecord<{}>;
};
/**
 * Mutable map of synced NodeRecords from prooph board
 *
 * The cody server expects an immutable map.
 * However, cody-vsa-specs injects a mutable map via cody.config.ts to allow
 * efficient navigation through the entire node graph.
 *
 */
export declare class SyncedNodesMap {
    private defaultSystemName;
    private nodes;
    private types;
    constructor(defaultSystemName: string);
    get<M extends NodeRecordMetadata>(nodeId: NodeId): NodeRecord<M> | undefined;
    set(nodeId: NodeId, node: Node): SyncedNodesMap;
    nodeMap(): Map<string, NodeRecord<any>>;
    clear(): SyncedNodesMap;
    getTypes(): InformationTypeRegistry;
}
//# sourceMappingURL=synced-nodes-map.d.ts.map