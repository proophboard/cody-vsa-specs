import type { Spec } from "../spec.js";
import { type EventSpec } from "../event-spec.js";
import { type AggregateSpec } from "../aggregate-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { AggregateEventDescription } from "../../types/descriptions.js";
export declare class AggregateEventDescriptionSpec implements Spec {
    private eventSpec;
    private aggregateSpec;
    private ctx;
    constructor(eventSpec: EventSpec, aggregateSpec: AggregateSpec, ctx: VsaContext);
    desc(): AggregateEventDescription;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=aggregate-event-description-spec.d.ts.map