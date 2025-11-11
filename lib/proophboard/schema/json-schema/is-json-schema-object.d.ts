import type { JSONSchema7 } from "json-schema";
export declare const isJsonSchemaObject: (schema: any) => schema is ObjectSchema;
export interface ObjectSchema {
    type: "object";
    properties: {
        [propName: string]: JSONSchema7;
    };
    additionalProperties: boolean;
    required: string[];
}
//# sourceMappingURL=is-json-schema-object.d.ts.map