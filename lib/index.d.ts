import { type CodyResponse, type Node } from "@proophboard/cody-types";
import type { VsaContext } from "./vsa-cody-config.js";
export type { VsaCodyConfig } from "./vsa-cody-config.js";
export { SyncedNodesMap } from "./utils/synced-nodes-map.js";
export { CodyIgnoreAwareTree } from "./utils/fs-tree.js";
export declare const handleNode: (node: Node, ctx: VsaContext) => Promise<CodyResponse>;
//# sourceMappingURL=index.d.ts.map