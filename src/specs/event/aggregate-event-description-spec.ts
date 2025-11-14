import type {Spec} from "../spec.js";
import  {type EventSpec} from "../event-spec.js";
import  {type AggregateSpec} from "../aggregate-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import type {AggregateEventDescription, EventDescription} from "../../types/descriptions.js";
import {pbDesc} from "../../proophboard/description.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";

export class AggregateEventDescriptionSpec implements Spec {
  private eventSpec: EventSpec;
  private aggregateSpec: AggregateSpec;
  private ctx: VsaContext;

  constructor(eventSpec: EventSpec, aggregateSpec: AggregateSpec, ctx: VsaContext) {
    this.eventSpec = eventSpec;
    this.aggregateSpec = aggregateSpec;
    this.ctx = ctx;
  }

  desc (): AggregateEventDescription {
    const meta = this.eventSpec.metadata();

    return {
      ...pbDesc(this.eventSpec.node(), this.ctx),
      name: this.eventSpec.name(),
      public: meta.public,
      aggregateEvent: true,
      aggregateName: this.aggregateSpec.name(),
      aggregateIdentifier: this.aggregateSpec.identifier(),
      aggregateState: this.aggregateSpec.state().name()
    }
  }

  folderPath(): string {
    return this.eventSpec.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'desc.spec.json');
  }

  toJSON(): object {
    return this.desc();
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
