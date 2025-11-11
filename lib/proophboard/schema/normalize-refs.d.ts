import type { JSONSchema7 } from "json-schema";
export declare const normalizeRefs: (schema: JSONSchema7, defaultSystemName: string) => JSONSchema7;
export declare const visitRef: (schema: JSONSchema7, visitor: (ref: string) => string) => JSONSchema7;
//# sourceMappingURL=normalize-refs.d.ts.map