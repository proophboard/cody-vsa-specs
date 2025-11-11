import { CodyResponseType } from "@proophboard/cody-types";
import { isJsonSchemaRef as isRefSchema } from "./json-schema/is-json-schema-ref.js";
import { fqcnFromDefinitionId } from "./definition-id.js";
import { splitPropertyRef } from "./resolve-refs.js";
import { isCodyError } from "@proophboard/cody-utils";
import { isListSchema } from "./json-schema/is-json-schema-array.js";
import { isJsonSchemaObject } from "./json-schema/is-json-schema-object.js";
export const ensureAllRefsAreKnown = (node, schema, ctx) => {
    if (isRefSchema(schema)) {
        const FQCN = fqcnFromDefinitionId(splitPropertyRef(schema.$ref)[0]);
        if (!ctx.syncedNodes.getTypes()[FQCN]) {
            return {
                cody: `Schema of ${node.getType()} "${node.getName()}" contains an unknown reference: "${schema.$ref}".`,
                type: CodyResponseType.Error,
                details: `Either it is a typo in the reference or you have to tell me about the referenced information first! I cannot find its qualified name "${FQCN}" in the types registry (vsaConfig.syncedNodes.getTypes())`,
            };
        }
        return true;
    }
    if (isListSchema(schema)) {
        return ensureAllRefsAreKnown(node, schema.items, ctx);
    }
    if (isJsonSchemaObject(schema)) {
        for (const prop in schema.properties) {
            const result = ensureAllRefsAreKnown(node, schema.properties[prop] || {}, ctx);
            if (isCodyError(result)) {
                return result;
            }
        }
    }
    return true;
};
//# sourceMappingURL=ensure-all-refs-are-known.js.map