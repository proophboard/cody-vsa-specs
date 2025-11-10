import type {JSONSchema7} from "json-schema";
import {definitionIdFromFQCN} from "../definition-id.js";

export const withId = (schema: JSONSchema7, fqcn: string): JSONSchema7 => {
  if(!schema.$id) {
    schema.$id = definitionIdFromFQCN(fqcn);
  }

  return schema;
}
