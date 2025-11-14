import type {Spec} from "../spec.js";
import type {AnyRule} from "../../types/rules.js";
import type {CommandSpec} from "../command-spec.js";
import type {SliceSpec} from "../slice-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import path from "node:path";
import {names} from "../../utils/names.js";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";

export class CommandHandlerSpec implements Spec {

  private handledCommand: CommandSpec;
  private handlerSlice: SliceSpec;
  private handlingRules: AnyRule[];
  private ctx: VsaContext;

  constructor(command: CommandSpec, slice: SliceSpec, rules: AnyRule[], ctx: VsaContext) {
    this.handledCommand = command;
    this.handlerSlice = slice;
    this.handlingRules = rules;
    this.ctx = ctx;
  }

  public rules () {
    return this.handlingRules;
  }

  public command () {
    return this.handledCommand;
  }

  public slice () {
    return this.handlerSlice;
  }

  folderPath(): string {
    return this.handledCommand.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'handle.spec.json')
  }

  toJSON(): object {
    return this.handlingRules;
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
