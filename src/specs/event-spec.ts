import type {Spec, SpecCollection} from "./spec.js";
import type {NodeRecord} from "../proophboard/node-record.js";
import {type PlayEventMeta, playEventMetadata, type RawEventMeta} from "../proophboard/metadata/play-event-metadata.js";
import type {SliceSpec} from "./slice-spec.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {isCodyError} from "@proophboard/cody-utils";
import {CodyResponseException} from "../utils/error-handling.js";
import {EventDescriptionSpec} from "./event/event-description-spec.js";
import path from "node:path";
import {names} from "../utils/names.js";
import {EventSchemaSpec} from "./event/event-schema-spec.js";
import {EventFactorySpec} from "./event/event-factory-spec.js";

export class EventSpec implements SpecCollection {

  private eventNode: NodeRecord<RawEventMeta>;
  private eventSlice: SliceSpec;
  private ctx: VsaContext;
  private eventDesc: EventDescriptionSpec;
  private eventSchema: EventSchemaSpec;
  private eventFactory: EventFactorySpec;


  constructor(eventNode: NodeRecord<RawEventMeta>, eventSlice: SliceSpec, ctx: VsaContext) {
    this.eventNode = eventNode;
    this.eventSlice = eventSlice;
    this.ctx = ctx;

    const meta = this.metadata();

    this.eventDesc = new EventDescriptionSpec(this, ctx);
    this.eventSchema = new EventSchemaSpec(this, meta.schema,  ctx);
    this.eventFactory = new EventFactorySpec(this, ctx);
  }

  public node () {
    return this.eventNode;
  }

  public name (): string {
    return this.eventNode.getFullQualifiedName(this.ctx.defaultSystemName);
  }

  public label () {
    return this.eventNode.getName();
  }

  public cardDescription () {
    return this.eventNode.getDescription();
  }

  public desc () {
    return this.eventDesc;
  }

  public factory () {
    return this.eventFactory;
  }

  public schema ( ) {
    return this.eventSchema;
  }

  public slice () {
    return this.eventSlice;
  }

  public metadata (): PlayEventMeta {
    const meta = playEventMetadata(
      this.label(),
      this.name(),
      this.eventNode.getParsedMetadata(),
      this.ctx
    )

    if(isCodyError(meta)) {
      throw new CodyResponseException(meta);
    }

    return meta;
  }

  public folderPath () {
    return path.join(this.eventSlice.folderPath(), 'events', names(this.eventNode.getName()).fileName);
  }

  specs(): Spec[] {
    return [
      this.eventDesc,
      this.eventSchema,
      this.eventFactory,
    ];
  }
}
