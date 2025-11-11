import { definitionIdFromFQCN } from "../definition-id.js";
export const withId = (schema, fqcn) => {
    if (!schema.$id) {
        schema.$id = definitionIdFromFQCN(fqcn);
    }
    return schema;
};
//# sourceMappingURL=with-id.js.map