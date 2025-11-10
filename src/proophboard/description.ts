import type {NodeId} from "@proophboard/cody-types";
import type {NodeRecord} from "./node-record.js";
import type {VsaContext} from "../vsa-cody-config.js";

export interface ProophBoardDescription {
  _pbBoardId: string;
  _pbCardId: NodeId;
  _pbLink: string;
}

export function pbDesc (node: NodeRecord<any>, ctx: VsaContext): ProophBoardDescription {
  return {
    _pbBoardId: ctx.boardId,
    _pbCardId: node.getId(),
    _pbLink: node.getLink()
  }
}
