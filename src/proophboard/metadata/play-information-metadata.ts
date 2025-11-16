import type {AnyRule} from "../../types/rules.js";
import type {UiSchema} from "@rjsf/utils";
import {
  type DependencyRegistry,
  type InformationDescriptionFlags, isQueryableStateDescription,
  isStateDescription
} from "../../types/descriptions.js";
import {normalizeProjectionConfig, type ProjectionConfig} from "../../types/projection-config.js";
import type {SortOrder, SortOrderItem} from "../../types/document-store.js";
import type {JSONSchema7} from "json-schema";
import type {VsaContext} from "../../vsa-cody-config.js";
import type {CodyResponse} from "@proophboard/cody-types";
import {isShorthand} from "../schema/shorthand/shorthand.js";
import {jsonSchemaFromShorthand} from "../schema/json-schema-from-shorthand.js";
import {isCodyError} from "@proophboard/cody-utils";
import {definitionIdFromFQCN, fqcnFromDefinitionId, systemNameFromFQCN} from "../schema/definition-id.js";
import {resolveRefs, resolveUiSchema} from "../schema/resolve-refs.js";
import {addSchemaTitles} from "../schema/add-schema-titles.js";
import {normalizeRefs} from "../schema/normalize-refs.js";
import {isInlineItemsArraySchema, isListSchema} from "../schema/json-schema/is-json-schema-array.js";
import merge from "lodash/fp/merge.js";
import {resolveType} from "../../types/resolve-type.js";
import {names} from "../../utils/names.js";
import {toSingularItemName} from "../../utils/nlp/to-singular.js";
import {renameFQCN} from "../schema/rename-fqcn.js";


export interface RawInformationMeta {
  identifier?: string;
  hasIdentifier?: boolean;
  schema: any;
  querySchema?: any;
  resolve?: ResolveConfig;
  ns?: string;
  collection?: string | boolean;
  initialize?: AnyRule[];
  uiSchema?: UiSchema & TableUiSchema;
  queryDependencies?: DependencyRegistry;
  projection?: ProjectionConfig;
  shorthand?: boolean;
}

export interface ResolveConfig {
  where?: AnyRule,
  orderBy?: SortOrderItem | SortOrder,
  rules?: AnyRule[],
}

export interface RefTableColumn {
  data: string;
  value: AnyRule[] | string;
}

export interface PageLinkTableColumn {
  page: string;
  mapping: Record<string, string>;
}

export type ColumnSingleSelectValueOption = string | {label: string, value: string};

export interface TableColumnUiSchema {
  field: string;
  headerName?: string;
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
  flex?: string | number;
  width?: string | number;
  value?: AnyRule[] | string;
  valueOptions?: ColumnSingleSelectValueOption[];
  pageLink?: string | PageLinkTableColumn;
  ref?: { data: string; value: string };
  link?: string | AnyRule[];
}

export type StringOrTableColumnUiSchema = string | TableColumnUiSchema;

interface TableProps {
  columns?: StringOrTableColumnUiSchema[],
  pageSize?: number,
  pageSizeOptions?: number[],
  density?: 'compact' | 'standard' | 'comfortable',
  hideToolbar?: boolean,
  // @TODO: show/hide specific grid toolbar options or hide entire grid toolbar
  // @TODO: support endless scroll, pagination, ... ?
}

export interface TableUiSchema {
  "ui:table"?: TableProps;
  table?: TableProps;
}

export interface PlayInformationMetadata extends InformationDescriptionFlags {
  schema: JSONSchema7;
  querySchema?: JSONSchema7;
  ns: string;
  service: string;
  isList: boolean;
  hasIdentifier: boolean;
  isQueryable: boolean;
  identifier?: string;
  collection?: string;
  initialize?: AnyRule[];
  itemType?: string;
  resolve?: ResolveConfig;
  uiSchema?: UiSchema & TableUiSchema;
  queryDependencies?: DependencyRegistry;
  projection?: ProjectionConfig;
}

export const playInformationMetadata = (label: string, FQCN: string, meta: RawInformationMeta | null, ctx: VsaContext): PlayInformationMetadata | CodyResponse => {

  if(!meta) {
    meta = {
      schema: {}
    }
  }

  let ns = meta.ns || '/';

  if(ns[ns.length - 1] !== '/') {
    ns += '/';
  }

  let schema: any = meta.schema || {};
  const isMaybeShorthand = typeof meta.shorthand === "undefined" || meta.shorthand;

  if(isMaybeShorthand && isShorthand(meta.schema)) {
    const jsonSchema = jsonSchemaFromShorthand(meta.schema, ns);

    if(isCodyError(jsonSchema)) {
      return jsonSchema;
    }

    schema = normalizeRefs(addSchemaTitles(label, jsonSchema), ctx.defaultSystemName);
  }

  const resolvedSchema = resolveRefs(schema, ctx);
  const resolvedUiSchema = resolveUiSchema(schema, ctx);
  resolvedSchema['$id'] = definitionIdFromFQCN(FQCN);

  let querySchema: any = meta.querySchema;

  if(querySchema) {
    if(isShorthand(querySchema)) {
      const queryJsonSchema = jsonSchemaFromShorthand(meta.querySchema, ns);

      if(isCodyError(queryJsonSchema)) {
        return queryJsonSchema;
      }

      querySchema = normalizeRefs(addSchemaTitles('Get ' + label, queryJsonSchema), ctx.defaultSystemName);
    }

    querySchema = resolveRefs(querySchema, ctx);
  }

  const hasIdentifier = !!meta.identifier;
  const isQueryable = !!meta.querySchema;

  let isNotStored = false;

  if(typeof meta.collection === "boolean" && !meta.collection) {
    isNotStored = true;
  }

  const convertedMeta: PlayInformationMetadata = {
    schema: resolvedSchema,
    uiSchema: merge(resolvedUiSchema, meta.uiSchema || {}),
    ns,
    service: systemNameFromFQCN(FQCN),
    isList: isListSchema(resolvedSchema) || isInlineItemsArraySchema(resolvedSchema),
    hasIdentifier,
    isQueryable,
  }

  if(hasIdentifier) {
    convertedMeta.identifier = meta.identifier;
  }

  if(meta.initialize) {
    convertedMeta.initialize = meta.initialize;
  }

  if(meta.resolve) {
    convertedMeta.resolve = meta.resolve;
  }

  if(typeof meta.collection === "string") {
    convertedMeta.collection = meta.collection;
  }

  if(isListSchema(schema)) {

    const refNode = resolveType(schema.items, schema, label, ctx);
    if(isCodyError(refNode)) {
      return refNode;
    }

    convertedMeta.itemType = refNode.getFullQualifiedName(ctx.defaultSystemName);

    const refNodeMeta = playInformationMetadata(refNode.getName(), refNode.getFullQualifiedName(ctx.defaultSystemName), refNode.getParsedMetadata(), ctx);
    if(isCodyError(refNodeMeta)) {
      return refNodeMeta;
    }

    if(isQueryable) {
      if(isStateDescription(refNodeMeta)) {
        convertedMeta.hasIdentifier = true;
        convertedMeta.identifier = refNodeMeta.identifier;
      }

      if(isQueryableStateDescription(refNodeMeta) && !convertedMeta.collection) {
        convertedMeta.collection = refNodeMeta.collection;
      } else if (typeof meta.collection !== "string") {
        convertedMeta.collection = names(refNode.getName()).constantName.toLowerCase() + '_collection';
      }
    }
  }

  if(isInlineItemsArraySchema(schema)) {
    if(meta.identifier) {
      convertedMeta.hasIdentifier = true;
      convertedMeta.identifier = meta.identifier;
    }

    const listFQCN = fqcnFromDefinitionId(convertedMeta.schema['$id'] as string);
    const itemLabel = toSingularItemName(label);
    convertedMeta.itemType = renameFQCN(listFQCN, itemLabel);
  }

  if(isQueryable) {
    convertedMeta.querySchema = querySchema;
    if(!convertedMeta.collection && convertedMeta.hasIdentifier && (typeof meta.collection === "undefined" || typeof meta.collection === "string")) {
      convertedMeta.collection = meta.collection || names(label).constantName.toLowerCase() + '_collection';
    }

    if(!convertedMeta.collection && typeof meta.collection === "string") {
      convertedMeta.collection = meta.collection;
    }
  }

  convertedMeta.isNotStored = isNotStored;

  if(meta.queryDependencies) {
    convertedMeta.queryDependencies = meta.queryDependencies;
  }

  if(meta.projection) {
    convertedMeta.projection = normalizeProjectionConfig(meta.projection, fqcnFromDefinitionId(convertedMeta.schema['$id'] as string))
  }

  return convertedMeta;
}
