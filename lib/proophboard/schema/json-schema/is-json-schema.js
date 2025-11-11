export const SCHEMA_TYPES = ["object", "array", "string", "integer", "number", "boolean", "null"];
export const PRIMITIVE_SCHEMA_TYPES = ["string", "integer", "number", "boolean", "null"];
export const isJsonSchema = (schema) => {
    if (typeof schema !== "object") {
        return false;
    }
    if (schema.type && !isValidType(schema.type)) {
        return false;
    }
    if (schema.$ref || schema.$id || schema.title) {
        return true;
    }
    return !Object.keys(schema).length;
};
const isValidType = (type) => {
    if (Array.isArray(type)) {
        for (const typeElement of type) {
            if (!isValidType(typeElement)) {
                return false;
            }
        }
    }
    if (typeof type !== "string") {
        return false;
    }
    return SCHEMA_TYPES.includes(type);
};
//# sourceMappingURL=is-json-schema.js.map