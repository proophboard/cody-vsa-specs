import type { Spec, SpecCollection } from "./spec.js";
import type { NodeRecord } from "../proophboard/node-record.js";
import { type PlayEventMeta, type RawEventMeta } from "../proophboard/metadata/play-event-metadata.js";
import type { SliceSpec } from "./slice-spec.js";
import type { VsaContext } from "../vsa-cody-config.js";
import { EventDescriptionSpec } from "./event/event-description-spec.js";
import { EventSchemaSpec } from "./event/event-schema-spec.js";
import { EventFactorySpec } from "./event/event-factory-spec.js";
export declare class EventSpec implements SpecCollection {
    private eventNode;
    private eventSlice;
    private ctx;
    private eventDesc;
    private eventSchema;
    private eventFactory;
    constructor(eventNode: NodeRecord<RawEventMeta>, eventSlice: SliceSpec, ctx: VsaContext);
    node(): NodeRecord<RawEventMeta>;
    name(): string;
    label(): string;
    cardDescription(): string;
    desc(): EventDescriptionSpec;
    factory(): EventFactorySpec;
    schema(): EventSchemaSpec;
    slice(): SliceSpec;
    metadata(): PlayEventMeta;
    folderPath(): string;
    specs(): Spec[];
}
//# sourceMappingURL=event-spec.d.ts.map