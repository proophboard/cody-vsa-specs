export const isJsonSchemaRef = (schema) => {
    return typeof schema === "object" && typeof schema["$ref"] === "string";
};
//# sourceMappingURL=is-json-schema-ref.js.map