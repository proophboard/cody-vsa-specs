import { type CodyResponse, NodeType } from "@proophboard/cody-types";
import { List } from "immutable";
import type { NodeRecord } from "../proophboard/node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
type Success = NodeRecord<any>;
type Error = CodyResponse;
export declare const findParentByType: (node: NodeRecord<any> | null, type: NodeType, ctx: VsaContext) => NodeRecord<any> | null;
export declare const getNodesOfTypeNearby: (node: NodeRecord<any>, type: NodeType, nearbyPadding: number, ctx: VsaContext) => List<NodeRecord<any>>;
export declare const getNodeFromSyncedNodesByFQCN: (fqcn: string, type: NodeType, ctx: VsaContext) => Success | Error;
export {};
//# sourceMappingURL=node-tree.d.ts.map