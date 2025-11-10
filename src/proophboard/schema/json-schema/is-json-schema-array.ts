import type {JSONSchema7} from "json-schema";
import {isJsonSchemaRef, type RefSchema} from "./is-json-schema-ref.js";

export const isJsonSchemaArray = (schema: Record<string, any>): schema is JSONSchema7 => {
  if(typeof schema !== "object") {
    return false;
  }

  return schema.type && schema.type === "array";
}

export interface ListSchema {
  type: "array";
  items: RefSchema;
}

export const isListSchema = (schema: any): schema is ListSchema => {
  return !!schema['type'] && schema['type'] === "array" && schema['items'] && isJsonSchemaRef(schema['items']);
}

export interface InlineItemsArraySchema {
  type: "array";
  items: JSONSchema7;
  title?: string;
}

export const isInlineItemsArraySchema = (schema: any): schema is InlineItemsArraySchema => {
  return !!schema['type'] && schema['type'] === "array" && schema['items'] && !isJsonSchemaRef(schema['items']);
}
