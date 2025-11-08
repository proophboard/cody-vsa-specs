import type {JSONSchema7} from "json-schema";
import type {UiSchema} from "@rjsf/utils";
import type {
  AggregateCommandDescription,
  CommandDescription,
  PureCommandDescription,
  StreamCommandDescription
} from "../types/descriptions.js";
import type {AnyRule} from "../types/rules.js";

export class CommandSpec {
  /* @TODO: implement spec
  schema: (version?: string) => JSONSchema7;
  uiSchema: () => UiSchema;
  description: () => CommandDescription | AggregateCommandDescription | PureCommandDescription | StreamCommandDescription;
  factoryRules: AnyRule[];
  schemaFilePath: (version?: string) => string;
  uiSchemaFilePath: () => string;
  descriptionFilePath: () => string;
  factoryRulesFilePath: () => string;
  */
}
