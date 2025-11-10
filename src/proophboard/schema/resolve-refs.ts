import type {UiSchema} from "@rjsf/utils";
import type {JSONSchema7} from "json-schema";
import {playFQCNFromDefinitionId} from "./definition-id.js";
import {InformationSpec} from "../../specs/information-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import {cloneDeep} from "lodash-es";
import merge from "lodash/fp/merge.js"


export type UiSchemaTFunction = (uiSchema: UiSchema, key: string) => UiSchema;
export type JsonSchemaTFunction = (schema: JSONSchema7, key: string) => JSONSchema7;

export const isPropertyRef = (ref: string): boolean => {
  return ref.indexOf(':') !== -1;
}

export const splitPropertyRef = (ref: string): [string, string] => {
  const split = ref.split(':');

  if(split.length === 1) {
    split.push('');
  }
  return split as [string, string];
}

export const resolveUiSchema = (schema: JSONSchema7, ctx: VsaContext): UiSchema | undefined => {
  let uiSchema: UiSchema = {};
  if(schema['$ref']) {

    const isPropRef = isPropertyRef(schema['$ref']);
    const [ref, prop] = isPropRef ? splitPropertyRef(schema['$ref']) : [schema['$ref'], ''];

    const fqcn = playFQCNFromDefinitionId(ref);

    const refNode = ctx.syncedNodes.getTypes()[fqcn];


    const refSchema = refNode ? (new InformationSpec()).schema() : undefined;

    if(refSchema) {
      schema = cloneDeep(refSchema as JSONSchema7);
    }

    const refUiSchema = refNode ? (new InformationSpec()).uiSchema() : undefined;

    if(refUiSchema && Object.keys(refUiSchema).length > 0) {
      if(!isPropRef) {
        uiSchema = refUiSchema;
      } else {
        uiSchema = refUiSchema[prop] || {};
      }
    }
  }

  if(schema && schema.properties) {
    for (const prop in schema.properties) {
      const propUiSchema = resolveUiSchema(schema.properties[prop] as JSONSchema7, ctx);

      if(propUiSchema) {
        uiSchema[prop] = uiSchema[prop]? {...uiSchema[prop], ...propUiSchema} : propUiSchema;
      }
    }
  }

  if(schema && schema.items) {
    const itemsUiSchema = resolveUiSchema(schema.items as JSONSchema7, ctx);

    if(itemsUiSchema) {
      uiSchema['items'] = uiSchema['items']? {...uiSchema['items'], ...itemsUiSchema} : itemsUiSchema;
    }
  }

  return Object.keys(uiSchema).length > 0 ? uiSchema : undefined;
}

const withOriginalTitle = (resolvedSchema: JSONSchema7, originalTitle?: string): JSONSchema7 => {
  if(!originalTitle) {
    return resolvedSchema;
  }

  return merge(resolvedSchema, {title: originalTitle})
}

export const resolveRefs = (schema: JSONSchema7, ctx: VsaContext, isNested?: boolean): JSONSchema7 => {
  schema = cloneDeep(schema);

  if(schema['$ref']) {
    const isPropRef = isPropertyRef(schema['$ref']);
    const [ref, prop] = isPropRef ? splitPropertyRef(schema['$ref']) : [schema['$ref'], ''];

    const refRecord = ctx.syncedNodes.getTypes()[ref];

    if(refRecord) {
      let resolvedSchema = (new InformationSpec()).schema();

      // Remove $id from resolved schema to avoid ajv complaining about ambiguous schemas
      if(typeof resolvedSchema['$id'] !== 'undefined' && isNested) {
        delete resolvedSchema['$id'];
      }


      if(resolvedSchema.type && (resolvedSchema.type === 'object' || resolvedSchema.type === 'array')) {
        resolvedSchema = resolveRefs(resolvedSchema, ctx, isNested);
      }

      if(isPropRef) {
        if(!resolvedSchema.type || resolvedSchema.type !== "object" || !resolvedSchema.properties || typeof resolvedSchema.properties[prop] === "undefined") {
          throw new Error(`The reference "${schema['$ref']}" cannot be resolved. Property "${prop}" is not found in the resolved schema of "${ref}"!`);
        }

        return withOriginalTitle(resolvedSchema.properties[prop] as JSONSchema7, schema.title);
      }

      return withOriginalTitle(resolvedSchema as JSONSchema7, schema.title);
    }
    throw new Error(`The reference "${schema['$ref']}" cannot be resolved. It is not listed in types/definitions.ts!`);
  }

  if(schema && schema.properties) {
    for (const prop in schema.properties) {
      schema.properties[prop] = resolveRefs(schema.properties[prop] as JSONSchema7, ctx, true);
    }
  }

  if(schema && schema.items) {
    schema.items = resolveRefs(schema.items as JSONSchema7, ctx, true);
  }

  // Remove $id from resolved schema to avoid ajv complaining about ambiguous schemas
  if(typeof schema['$id'] !== 'undefined' && isNested) {
    delete schema['$id'];
  }

  return schema;
}
