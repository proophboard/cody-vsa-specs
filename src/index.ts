import {type CodyHook, type CodyResponse, CodyResponseType, type Node} from "@proophboard/cody-types";
import type {VsaContext} from "./vsa-cody-config.js";
import {writeSpecsForNode} from "./specs/write-specs-for-node.js";
import {makeNodeRecordFromNode} from "./proophboard/node-record.js";
import {handleError} from "./utils/handle-error.js";

export type {VsaCodyConfig} from "./vsa-cody-config.js";
export {SyncedNodesMap} from "./utils/synced-nodes-map.js";
export {CodyIgnoreAwareTree} from "./utils/fs-tree.js";

const handle = async (node: Node, ctx: VsaContext): Promise<CodyResponse> => {
  try {
    const response = await writeSpecsForNode(makeNodeRecordFromNode(node, ctx.syncedNodes), ctx);

    return response;
  } catch (e) {
    return handleError(e);
  }
}

export const onCommand: CodyHook<VsaContext> = async (command, ctx) => {
  return handle(command, ctx);
}

