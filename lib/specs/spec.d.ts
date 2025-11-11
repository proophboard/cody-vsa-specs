import type { NodeRecord } from "../proophboard/node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
import type { SliceSpec } from "./slice-spec.js";
export interface Spec {
    toJSON: () => object;
    toSpecContent: () => string;
    folderPath: () => string;
    specFilePath: () => string;
}
export interface SpecCollection {
    folderPath: () => string;
    specs: () => Spec[];
}
export declare function isSpecCollection(spec: any): spec is SpecCollection;
export declare function makeNodeSpec(node: NodeRecord<any>, slice: SliceSpec, ctx: VsaContext): Spec | SpecCollection;
//# sourceMappingURL=spec.d.ts.map