import type { Spec } from "../spec.js";
import { type EventSpec } from "../event-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { EventDescription } from "../../types/descriptions.js";
export declare class EventDescriptionSpec implements Spec {
    private eventSpec;
    private ctx;
    constructor(eventSpec: EventSpec, ctx: VsaContext);
    desc(): EventDescription;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=event-description-spec.d.ts.map