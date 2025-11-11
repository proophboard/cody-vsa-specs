import type { JSONSchema7 } from "json-schema";
export interface RefSchema {
    "$ref": string;
}
export declare const isJsonSchemaRef: (schema: JSONSchema7) => schema is RefSchema;
//# sourceMappingURL=is-json-schema-ref.d.ts.map