import type { Spec } from "../specs/spec.js";
import type { VsaContext } from "../vsa-cody-config.js";
export type SpecContentConverter = (spec: Spec, ctx: VsaContext) => string;
export declare const convertSpecToFileContent: (spec: Spec, ctx: VsaContext) => string;
//# sourceMappingURL=convert-spec-to-file-content.d.ts.map