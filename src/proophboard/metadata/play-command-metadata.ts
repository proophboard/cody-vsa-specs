import type {JSONSchema7} from "json-schema";
import {jsonSchemaFromShorthand, type ShorthandObject} from "../schema/json-schema-from-shorthand.js";
import type {UiSchema} from "@rjsf/utils";
import type {DependencyRegistry} from "../../types/descriptions.js";
import type {AnyRule} from "../../types/rules.js";
import type {CodyResponse} from "@proophboard/cody-types";
import type {VsaContext} from "../../vsa-cody-config.js";
import {isShorthand} from "../schema/shorthand/shorthand.js";
import {isCodyError} from "@proophboard/cody-utils";
import {normalizeRefs} from "../schema/normalize-refs.js";
import {addSchemaTitles} from "../schema/add-schema-titles.js";
import {definitionIdFromFQCN} from "../schema/definition-id.js";
import {resolveRefs, resolveUiSchema} from "../schema/resolve-refs.js";
import merge from "lodash/fp/merge.js";

export interface RawCommandMeta {
  schema: JSONSchema7 | ShorthandObject;
  newAggregate?: boolean;
  aggregateCommand?: boolean;
  service?: string;
  uiSchema?: UiSchema;
  dependencies?: DependencyRegistry;
  rules?: AnyRule[];
  persistState?: boolean;
  deleteState?: boolean;
  deleteHistory?: boolean;
  uiDisableFetchState?: boolean;
  streamId?: string;
  streamName?: string;
  publicStream?: string;
  factory?: AnyRule[];
}

export interface PlayCommandMeta {
  newAggregate: boolean;
  schema: JSONSchema7;
  aggregateCommand: boolean;
  streamCommand: boolean;
  service?: string;
  uiSchema?: UiSchema;
  dependencies?: DependencyRegistry;
  rules?: AnyRule[];
  persistState?: boolean;
  deleteState?: boolean;
  deleteHistory?: boolean;
  uiDisableFetchState?: boolean;
  streamId?: string;
  streamName?: string;
  publicStream?: string;
  factory?: AnyRule[];
}

export const playCommandMetadata = (label: string, FQCN: string, meta: RawCommandMeta | null, ctx: VsaContext): PlayCommandMeta | CodyResponse => {

  if(!meta) {
    meta = {
      newAggregate: false,
      aggregateCommand: false,
      schema: {},
    };
  }

  let schema = meta.schema || {};

  if(isShorthand(schema)) {
    const convertedSchema = jsonSchemaFromShorthand(schema, '/commands');

    if(isCodyError(convertedSchema)) {
      return convertedSchema;
    }

    schema = normalizeRefs(addSchemaTitles(label, convertedSchema), ctx.defaultSystemName);
  }

  const resolvedSchema = resolveRefs(schema, ctx);
  const resolvedUiSchema = resolveUiSchema(schema, ctx);
  resolvedSchema['$id'] = definitionIdFromFQCN(FQCN);

  const aggregateCommand = meta.aggregateCommand || meta.newAggregate || false;
  const streamCommand = !aggregateCommand && !!meta.streamId;
  const newAggregate = !!meta.newAggregate;

  return {
    ...meta,
    schema: resolvedSchema,
    uiSchema: merge(resolvedUiSchema, meta.uiSchema || {}),
    newAggregate,
    aggregateCommand,
    streamCommand
  }
}
