import type {Spec} from "../spec.js";
import type {EventSpec} from "../event-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import type {AnyRule} from "../../types/rules.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";

export class EventFactorySpec implements Spec {
  private event: EventSpec;
  private ctx: VsaContext;

  constructor(event: EventSpec, ctx: VsaContext) {
    this.event = event;
    this.ctx = ctx;
  }

  factory (): AnyRule[] {
    return this.event.metadata().factory || [];
  }

  folderPath(): string {
    return this.event.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'factory.spec.json');
  }

  toJSON(): object {
    return this.factory();
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
