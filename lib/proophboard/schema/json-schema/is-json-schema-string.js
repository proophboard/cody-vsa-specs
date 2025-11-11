export const isJsonSchemaString = (schema, format) => {
    if (schema.type && schema.type === "string") {
        if (format) {
            return !!schema.format && schema.format === format;
        }
        return true;
    }
    return false;
};
//# sourceMappingURL=is-json-schema-string.js.map