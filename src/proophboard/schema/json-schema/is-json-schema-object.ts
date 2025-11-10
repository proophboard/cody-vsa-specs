import type {JSONSchema7} from "json-schema";

export const isJsonSchemaObject = (schema: any): schema is ObjectSchema => {
  if(typeof schema !== "object") {
    return false;
  }

  return schema.type && schema.type === "object";
}

export interface ObjectSchema {
  type: "object",
  properties: {[propName: string]: JSONSchema7},
  additionalProperties: boolean,
  required: string[]
}


