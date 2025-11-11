import type { NodeId } from "@proophboard/cody-types";
import type { NodeRecord } from "./node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
export interface ProophBoardDescription {
    _pbBoardId: string;
    _pbCardId: NodeId;
    _pbLink: string;
}
export declare function pbDesc(node: NodeRecord<any>, ctx: VsaContext): ProophBoardDescription;
//# sourceMappingURL=description.d.ts.map