import type {SpecCollection} from "./spec.js";
import type {JSONSchema7} from "json-schema";
import type {UiSchema} from "@rjsf/utils";
import type {InformationDescriptionFlags} from "../types/descriptions.js";
import type {NodeRecord} from "../proophboard/node-record.js";

export class InformationSpec implements SpecCollection {

  private informationNode: NodeRecord<any>

  public metadata (): InformationDescriptionFlags {
    return {
      isList: false,
      hasIdentifier: false,
      isQueryable: false
    }
  }

  public name (): string {
    return '';
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
