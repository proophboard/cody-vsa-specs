export const isJsonSchemaObject = (schema) => {
    if (typeof schema !== "object") {
        return false;
    }
    return schema.type && schema.type === "object";
};
//# sourceMappingURL=is-json-schema-object.js.map