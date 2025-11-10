import type {SpecCollection} from "./spec.js";
import type {JSONSchema7} from "json-schema";
import type {UiSchema} from "@rjsf/utils";

export class InformationSpec implements SpecCollection {

  public schema (): JSONSchema7 {
    return {}
  }

  public uiSchema (): UiSchema {
    return {}
  }

  public specs () {
    return [];
  }

  folderPath(): string {
    return "";
  }
}
