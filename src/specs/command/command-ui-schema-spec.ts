import type {Spec} from "../spec.js";
import type {CommandSpec} from "../command-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import {resolveUiSchema} from "../../proophboard/schema/resolve-refs.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";
import type {UiSchema} from "@rjsf/utils";
import merge from "lodash/fp/merge.js";

export class CommandUiSchemaSpec implements Spec {
  private schemaCommand: CommandSpec;
  private commandUiSchema: UiSchema;
  private ctx: VsaContext;

  constructor(schemaCommand: CommandSpec, uiSchema: UiSchema, ctx: VsaContext) {
    this.schemaCommand = schemaCommand;

    const refUiSchema = resolveUiSchema(schemaCommand.schema().schema(), ctx);

    if(refUiSchema) {
      uiSchema = merge(refUiSchema, uiSchema);
    }

    this.commandUiSchema = uiSchema;
    this.ctx = ctx;
  }

  uiSchema () {
    return this.commandUiSchema;
  }

  folderPath(): string {
    return this.schemaCommand.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'ui-schema.spec.json');
  }

  toJSON(): object {
    return this.commandUiSchema;
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
