import type { JSONSchema7 } from "json-schema";
import { type RefSchema } from "./is-json-schema-ref.js";
export declare const isJsonSchemaArray: (schema: Record<string, any>) => schema is JSONSchema7;
export interface ListSchema {
    type: "array";
    items: RefSchema;
}
export declare const isListSchema: (schema: any) => schema is ListSchema;
export interface InlineItemsArraySchema {
    type: "array";
    items: JSONSchema7;
    title?: string;
}
export declare const isInlineItemsArraySchema: (schema: any) => schema is InlineItemsArraySchema;
//# sourceMappingURL=is-json-schema-array.d.ts.map