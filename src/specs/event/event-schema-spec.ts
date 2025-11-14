import type {Spec} from "../spec.js";
import type {EventSpec} from "../event-spec.js";
import type {JSONSchema7} from "json-schema";
import type {VsaContext} from "../../vsa-cody-config.js";
import {resolveRefs} from "../../proophboard/schema/resolve-refs.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";

export class EventSchemaSpec implements Spec {
  private schemaEvent: EventSpec;
  private jsonSchema: JSONSchema7;
  private ctx: VsaContext;

  constructor(schemaEvent: EventSpec, jsonSchema: JSONSchema7, ctx: VsaContext) {
    this.schemaEvent = schemaEvent;
    this.jsonSchema = resolveRefs(jsonSchema, ctx);
    this.ctx = ctx;
  }

  schema () {
    return this.jsonSchema;
  }

  folderPath(): string {
    return this.schemaEvent.folderPath();
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
