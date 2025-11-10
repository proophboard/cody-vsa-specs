import type {Spec} from "../spec.js";
import type {CommandSpec} from "../command-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";
import type {AnyRule} from "../../types/rules.js";

export class CommandFactorySpec implements Spec {
  private command: CommandSpec;
  private ctx: VsaContext;

  constructor(command: CommandSpec, ctx: VsaContext) {
    this.command = command;
    this.ctx = ctx;
  }

  factory (): AnyRule[] {
    return this.command.metadata().factory || [];
  }

  folderPath(): string {
    return this.command.folderPath();
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
