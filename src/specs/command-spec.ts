import type {SpecCollection} from "./spec.js";
import type {NodeRecord} from "../proophboard/node-record.js";
import {
  type PlayCommandMeta, playCommandMetadata,
  type RawCommandMeta
} from "../proophboard/metadata/play-command-metadata.js";
import type {SliceSpec} from "./slice-spec.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {isCodyError} from "@proophboard/cody-utils";
import {CodyResponseException} from "../utils/error-handling.js";
import * as path from "node:path";
import {names} from "../utils/names.js";
import {CommandSchemaSpec} from "./command/command-schema-spec.js";
import {CommandUiSchemaSpec} from "./command/command-ui-schema-spec.js";

export class CommandSpec implements SpecCollection {

  private commandNode: NodeRecord<RawCommandMeta>;
  private commandSlice: SliceSpec;
  private commandSchema: CommandSchemaSpec;
  private commandUiSchema: CommandUiSchemaSpec;
  private ctx: VsaContext;

  constructor(commandNode: NodeRecord<PlayCommandMeta>, commandSlice: SliceSpec, ctx: VsaContext) {
    this.commandNode = commandNode;
    this.commandSlice = commandSlice;
    this.ctx = ctx;

    const meta = this.metadata();

    this.commandSchema = new CommandSchemaSpec(this, meta.schema, ctx);
    this.commandUiSchema = new CommandUiSchemaSpec(this, meta.uiSchema || {}, ctx);
  }

  public name () {
    return this.commandNode.getFullQualifiedName(this.ctx.defaultSystemName);
  }

  public label () {
    return this.commandNode.getName();
  }

  public description ( ){
    return this.commandNode.getDescription();
  }

  public metadata () {
    const meta = playCommandMetadata(
      this.label(),
      this.commandNode.getFullQualifiedName(this.ctx.defaultSystemName),
      this.commandNode.getParsedMetadata(),
      this.ctx
    );

    if(isCodyError(meta)) {
      throw new CodyResponseException(meta);
    }

    return meta;
  }

  public node () {
    return this.commandNode;
  }

  public slice () {
    return this.commandSlice;
  }

  public folderPath () {
    return path.join(this.commandSlice.folderPath(), 'commands', names(this.commandNode.getName()).fileName);
  }

  public schema () {
    return this.commandSchema;
  }

  public uiSchema () {
    return this.commandUiSchema;
  }

  public specs () {
    return [
      this.commandSchema,
      this.commandUiSchema,
    ]
  }


  /* @TODO: implement spec
  uiSchema: () => UiSchema;
  description: () => CommandDescription | AggregateCommandDescription | PureCommandDescription | StreamCommandDescription;
  factoryRules: AnyRule[];
  */
}
