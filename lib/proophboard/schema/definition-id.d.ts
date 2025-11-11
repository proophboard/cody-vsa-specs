import type { VsaContext } from "../../vsa-cody-config.js";
import type { NodeRecord } from "../node-record.js";
export declare const definitionId: (vo: NodeRecord<any>, ctx: VsaContext) => string;
export declare const fqcnFromDefinitionId: (definitionId: string) => string;
export declare const definitionIdFromFQCN: (fqcn: string) => string;
export declare const nodeLabel: (nodeFQCN: string) => string;
export declare const systemNameFromFQCN: (nodeFQCN: string) => string;
//# sourceMappingURL=definition-id.d.ts.map