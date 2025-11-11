import { fqcnFromDefinitionId } from "./definition-id.js";
import { InformationSpec } from "../../specs/information-spec.js";
import { cloneDeep } from "lodash-es";
import merge from "lodash/fp/merge.js";
export const isPropertyRef = (ref) => {
    return ref.indexOf(':') !== -1;
};
export const splitPropertyRef = (ref) => {
    const split = ref.split(':');
    if (split.length === 1) {
        split.push('');
    }
    return split;
};
export const resolveUiSchema = (schema, ctx) => {
    let uiSchema = {};
    if (schema['$ref']) {
        const isPropRef = isPropertyRef(schema['$ref']);
        const [ref, prop] = isPropRef ? splitPropertyRef(schema['$ref']) : [schema['$ref'], ''];
        const fqcn = fqcnFromDefinitionId(ref);
        const refNode = ctx.syncedNodes.getTypes()[fqcn];
        const refSchema = refNode ? (new InformationSpec()).schema() : undefined;
        if (refSchema) {
            schema = cloneDeep(refSchema);
        }
        const refUiSchema = refNode ? (new InformationSpec()).uiSchema() : undefined;
        if (refUiSchema && Object.keys(refUiSchema).length > 0) {
            if (!isPropRef) {
                uiSchema = refUiSchema;
            }
            else {
                uiSchema = refUiSchema[prop] || {};
            }
        }
    }
    if (schema && schema.properties) {
        for (const prop in schema.properties) {
            const propUiSchema = resolveUiSchema(schema.properties[prop], ctx);
            if (propUiSchema) {
                uiSchema[prop] = uiSchema[prop] ? { ...uiSchema[prop], ...propUiSchema } : propUiSchema;
            }
        }
    }
    if (schema && schema.items) {
        const itemsUiSchema = resolveUiSchema(schema.items, ctx);
        if (itemsUiSchema) {
            uiSchema['items'] = uiSchema['items'] ? { ...uiSchema['items'], ...itemsUiSchema } : itemsUiSchema;
        }
    }
    return Object.keys(uiSchema).length > 0 ? uiSchema : undefined;
};
const withOriginalTitle = (resolvedSchema, originalTitle) => {
    if (!originalTitle) {
        return resolvedSchema;
    }
    return merge(resolvedSchema, { title: originalTitle });
};
export const resolveRefs = (schema, ctx, isNested) => {
    schema = cloneDeep(schema);
    if (schema['$ref']) {
        const isPropRef = isPropertyRef(schema['$ref']);
        const [ref, prop] = isPropRef ? splitPropertyRef(schema['$ref']) : [schema['$ref'], ''];
        const refRecord = ctx.syncedNodes.getTypes()[ref];
        if (refRecord) {
            let resolvedSchema = (new InformationSpec()).schema();
            // Remove $id from resolved schema to avoid ajv complaining about ambiguous schemas
            if (typeof resolvedSchema['$id'] !== 'undefined' && isNested) {
                delete resolvedSchema['$id'];
            }
            if (resolvedSchema.type && (resolvedSchema.type === 'object' || resolvedSchema.type === 'array')) {
                resolvedSchema = resolveRefs(resolvedSchema, ctx, isNested);
            }
            if (isPropRef) {
                if (!resolvedSchema.type || resolvedSchema.type !== "object" || !resolvedSchema.properties || typeof resolvedSchema.properties[prop] === "undefined") {
                    throw new Error(`The reference "${schema['$ref']}" cannot be resolved. Property "${prop}" is not found in the resolved schema of "${ref}"!`);
                }
                return withOriginalTitle(resolvedSchema.properties[prop], schema.title);
            }
            return withOriginalTitle(resolvedSchema, schema.title);
        }
        throw new Error(`The reference "${schema['$ref']}" cannot be resolved. It is not listed in types/definitions.ts!`);
    }
    if (schema && schema.properties) {
        for (const prop in schema.properties) {
            schema.properties[prop] = resolveRefs(schema.properties[prop], ctx, true);
        }
    }
    if (schema && schema.items) {
        schema.items = resolveRefs(schema.items, ctx, true);
    }
    // Remove $id from resolved schema to avoid ajv complaining about ambiguous schemas
    if (typeof schema['$id'] !== 'undefined' && isNested) {
        delete schema['$id'];
    }
    return schema;
};
//# sourceMappingURL=resolve-refs.js.map