import type {SpecCollection} from "./spec.js";
import type {JSONSchema7} from "json-schema";
import type {UiSchema} from "@rjsf/utils";
import type {ValueObjectDescriptionFlags} from "../types/descriptions.js";

export class InformationSpec implements SpecCollection {

  public metadata (): ValueObjectDescriptionFlags {
    return {
      isList: false,
      hasIdentifier: false,
      isQueryable: false
    }
  }

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
