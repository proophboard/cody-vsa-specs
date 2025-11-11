import { PRIMITIVE_SCHEMA_TYPES } from "./is-json-schema.js";
export const isJsonSchemaPrimitive = (schema) => {
    return !!schema.type && typeof schema.type === "string" && PRIMITIVE_SCHEMA_TYPES.includes(schema.type);
};
//# sourceMappingURL=is-json-schema-primitive.js.map