import type {Spec} from "../spec.js";
import type {CommandSpec} from "../command-spec.js";
import type {JSONSchema7} from "json-schema";
import type {VsaContext} from "../../vsa-cody-config.js";
import * as path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";
import {resolveRefs} from "../../proophboard/schema/resolve-refs.js";

export class CommandSchemaSpec implements Spec {
  private schemaCommand: CommandSpec;
  private jsonSchema: JSONSchema7;
  private ctx: VsaContext;

  constructor(schemaCommand: CommandSpec, jsonSchema: JSONSchema7, ctx: VsaContext) {
    this.schemaCommand = schemaCommand;
    this.jsonSchema = resolveRefs(jsonSchema, ctx);
    this.ctx = ctx;
  }

  schema () {
    return this.jsonSchema;
  }

  folderPath(): string {
    return this.schemaCommand.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'schema.spec.json');
  }

  toJSON(): object {
    return this.jsonSchema;
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
