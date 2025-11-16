import type {AnyRule} from "../../types/rules.js";
import type {JSONSchema7} from "json-schema";
import type {VsaContext} from "../../vsa-cody-config.js";
import type {CodyResponse} from "@proophboard/cody-types";
import {isShorthand} from "../schema/shorthand/shorthand.js";
import {jsonSchemaFromShorthand} from "../schema/json-schema-from-shorthand.js";
import {isCodyError} from "@proophboard/cody-utils";
import {normalizeRefs} from "../schema/normalize-refs.js";
import {addSchemaTitles} from "../schema/add-schema-titles.js";
import {definitionIdFromFQCN} from "../schema/definition-id.js";
import {resolveRefs, resolveUiSchema} from "../schema/resolve-refs.js";

export interface RawEventMeta {
  schema: any;
  service?: string;
  public?: boolean;
  applyRules?: AnyRule[];
  factory?: AnyRule[];
}

export interface PlayEventMeta {
  public: boolean;
  fqcn: string;
  schema: JSONSchema7;
  service?: string;
  applyRules?: AnyRule[];
  factory?: AnyRule[];
}

export const playEventMetadata = (label: string, FQCN: string, meta: RawEventMeta | null, ctx: VsaContext): PlayEventMeta | CodyResponse => {

  if(!meta) {
    meta = {
      public: false,
      schema: {}
    }
  }

  let schema: any = meta.schema || {};
  if(isShorthand(schema)) {
    const convertedSchema = jsonSchemaFromShorthand(schema, '/commands');

    if(isCodyError(convertedSchema)) {
      return convertedSchema;
    }

    schema = normalizeRefs(addSchemaTitles(label, convertedSchema), ctx.defaultSystemName);
  }

  const resolvedSchema = resolveRefs(schema, ctx);
  resolvedSchema['$id'] = definitionIdFromFQCN(FQCN);

  const parsedMeta: PlayEventMeta = {
    "public": !!meta.public,
    fqcn: FQCN,
    schema: resolvedSchema,
  }

  if(meta.service) {
    parsedMeta.service = meta.service;
  }

  if(meta.applyRules) {
    parsedMeta.applyRules = meta.applyRules;
  }

  if(meta.factory) {
    parsedMeta.factory = meta.factory;
  }

  return parsedMeta;
}
