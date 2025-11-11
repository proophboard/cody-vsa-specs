import { camelCaseToTitle, snakeCaseToCamelCase } from "../../utils/string.js";
import { names } from "../../utils/names.js";
export const mapPropertiesToTitles = (schema, property) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));
    if (property && !schema.title) {
        schemaCopy.title = camelCaseToTitle(snakeCaseToCamelCase(property));
    }
    if (schema.type && schema.type === 'object' && schema.properties) {
        Object.keys(schema.properties).forEach(key => {
            const propSchema = schema.properties[key];
            schemaCopy.properties[key] = mapPropertiesToTitles(propSchema, key);
        });
    }
    if (schema.type && schema.type === 'array' && schema.items) {
        schemaCopy.items = mapPropertiesToTitles(schema.items);
    }
    return schemaCopy;
};
export const addSchemaTitles = (elementName, schema) => {
    const schemaWithTitles = mapPropertiesToTitles(schema);
    if (!schemaWithTitles.title) {
        schemaWithTitles.title = camelCaseToTitle(names(elementName).className);
    }
    return schemaWithTitles;
};
//# sourceMappingURL=add-schema-titles.js.map