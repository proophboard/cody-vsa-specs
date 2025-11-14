import type {Spec} from "./spec.js";
import {convertSpecToFileContent} from "../utils/convert-spec-to-file-content.js";
import type {VsaContext} from "../vsa-cody-config.js";
import type {StateSpec} from "./state-spec.js";

export class AggregateSpec implements Spec {

  private aggregateState: StateSpec;
  private ctx: VsaContext;

  constructor(state: StateSpec, ctx: VsaContext) {
    this.aggregateState = state;
    this.ctx = ctx;
  }

  public name(): string {
    return '';
  }

  public state(): StateSpec {
    return this.aggregateState;
  }

  public identifier(): string {
    return this.aggregateState.identifier();
  }

  folderPath(): string {
    return "";
  }

  specFilePath(): string {
    return "";
  }

  toJSON(): object {
    return {};
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }

}
