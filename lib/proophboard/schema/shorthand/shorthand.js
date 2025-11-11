import { PRIMITIVE_SCHEMA_TYPES } from "../json-schema/is-json-schema.js";
export const isShorthand = (schema) => {
    if (typeof schema === "string") {
        return isPrimitive(schema) || isRef(schema);
    }
    if (typeof schema === "object") {
        return isObject(schema) || isList(schema) || isPrimitive(schema);
    }
    return false;
};
export const isObject = (schema) => {
    return typeof schema !== "string" && !isList(schema) && !isPrimitive(schema);
};
export const isList = (schema) => {
    if (!schema) {
        return false;
    }
    if (typeof schema === "string") {
        return false;
    }
    return typeof schema.$items !== "undefined";
};
export const isPrimitive = (schema) => {
    if (!schema) {
        return false;
    }
    let type = '';
    if (typeof schema === "string") {
        const parts = schema.split("|");
        type = parts[0];
    }
    else if (typeof schema.$type === 'string') {
        type = schema.$type;
    }
    if (type.startsWith('enum:')) {
        return true;
    }
    return PRIMITIVE_SCHEMA_TYPES.includes(type);
};
export const isString = (schema, format) => {
    if (typeof schema === "object") {
        if (!schema.$type) {
            return false;
        }
        return isString(schema.$type);
    }
    const parts = schema.split("|");
    if (parts[0] !== "string") {
        return false;
    }
    if (!format) {
        return true;
    }
    // Normalize format
    format = format.replace('format:', '');
    format = 'format:' + format;
    for (const part of parts) {
        if (part === format) {
            return true;
        }
    }
    return false;
};
export const isRef = (schema) => {
    if (typeof schema === "string") {
        return schema[0] === '/';
    }
    return typeof schema.$ref === "string";
};
//# sourceMappingURL=shorthand.js.map