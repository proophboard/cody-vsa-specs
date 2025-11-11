import { isJsonSchemaRef } from "./is-json-schema-ref.js";
export const isJsonSchemaArray = (schema) => {
    if (typeof schema !== "object") {
        return false;
    }
    return schema.type && schema.type === "array";
};
export const isListSchema = (schema) => {
    return !!schema['type'] && schema['type'] === "array" && schema['items'] && isJsonSchemaRef(schema['items']);
};
export const isInlineItemsArraySchema = (schema) => {
    return !!schema['type'] && schema['type'] === "array" && schema['items'] && !isJsonSchemaRef(schema['items']);
};
//# sourceMappingURL=is-json-schema-array.js.map