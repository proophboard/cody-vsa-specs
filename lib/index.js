import { CodyResponseType } from "@proophboard/cody-types";
import { writeSpecsForNode } from "./specs/write-specs-for-node.js";
import { makeNodeRecordFromNode } from "./proophboard/node-record.js";
import { handleError } from "./utils/handle-error.js";
export { SyncedNodesMap } from "./utils/synced-nodes-map.js";
export { CodyIgnoreAwareTree } from "./utils/fs-tree.js";
const handle = async (node, ctx) => {
    try {
        const response = await writeSpecsForNode(makeNodeRecordFromNode(node, ctx.syncedNodes), ctx);
        return response;
    }
    catch (e) {
        return handleError(e);
    }
};
export const onCommand = async (command, ctx) => {
    return handle(command, ctx);
};
//# sourceMappingURL=index.js.map