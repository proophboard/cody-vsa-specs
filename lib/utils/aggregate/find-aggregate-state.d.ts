import { type CodyResponse } from "@proophboard/cody-types";
import { type NodeRecord } from "../../proophboard/node-record.js";
import type { VsaContext } from "../../vsa-cody-config.js";
type Success = NodeRecord<any>;
type Error = CodyResponse;
export declare const findAggregateState: (commandEventOrAggregate: NodeRecord<any>, ctx: VsaContext) => Success | Error;
export {};
//# sourceMappingURL=find-aggregate-state.d.ts.map