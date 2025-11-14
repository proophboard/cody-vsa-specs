import type {Spec} from "../spec.js";
import  {type EventSpec} from "../event-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import type {EventDescription} from "../../types/descriptions.js";
import {pbDesc} from "../../proophboard/description.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";

export class EventDescriptionSpec implements Spec {
  private eventSpec: EventSpec;
  private ctx: VsaContext;

  constructor(eventSpec: EventSpec, ctx: VsaContext) {
    this.eventSpec = eventSpec;
    this.ctx = ctx;
  }

  desc (): EventDescription {
    const meta = this.eventSpec.metadata();

    return {
      ...pbDesc(this.eventSpec.node(), this.ctx),
      name: this.eventSpec.name(),
      public: meta.public,
      aggregateEvent: false,
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
