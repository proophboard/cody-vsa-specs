import { playEventMetadata } from "../proophboard/metadata/play-event-metadata.js";
import { isCodyError } from "@proophboard/cody-utils";
import { CodyResponseException } from "../utils/error-handling.js";
import { EventDescriptionSpec } from "./event/event-description-spec.js";
import path from "node:path";
import { names } from "../utils/names.js";
import { EventSchemaSpec } from "./event/event-schema-spec.js";
import { EventFactorySpec } from "./event/event-factory-spec.js";
export class EventSpec {
    eventNode;
    eventSlice;
    ctx;
    eventDesc;
    eventSchema;
    eventFactory;
    constructor(eventNode, eventSlice, ctx) {
        this.eventNode = eventNode;
        this.eventSlice = eventSlice;
        this.ctx = ctx;
        const meta = this.metadata();
        console.log("event meta", meta);
        console.log("raw meta", eventNode.getParsedMetadata());
        this.eventDesc = new EventDescriptionSpec(this, ctx);
        this.eventSchema = new EventSchemaSpec(this, meta.schema, ctx);
        this.eventFactory = new EventFactorySpec(this, ctx);
    }
    node() {
        return this.eventNode;
    }
    name() {
        return this.eventNode.getFullQualifiedName(this.ctx.defaultSystemName);
    }
    label() {
        return this.eventNode.getName();
    }
    cardDescription() {
        return this.eventNode.getDescription();
    }
    desc() {
        return this.eventDesc;
    }
    factory() {
        return this.eventFactory;
    }
    schema() {
        return this.eventSchema;
    }
    slice() {
        return this.eventSlice;
    }
    metadata() {
        const meta = playEventMetadata(this.label(), this.name(), this.eventNode.getParsedMetadata(), this.ctx);
        if (isCodyError(meta)) {
            throw new CodyResponseException(meta);
        }
        return meta;
    }
    folderPath() {
        return path.join(this.eventSlice.folderPath(), 'events', names(this.eventNode.getName()).fileName);
    }
    specs() {
        return [
            this.eventDesc,
            this.eventSchema,
            this.eventFactory,
        ];
    }
}
//# sourceMappingURL=event-spec.js.map