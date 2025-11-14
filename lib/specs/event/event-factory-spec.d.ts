import type { Spec } from "../spec.js";
import type { EventSpec } from "../event-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { AnyRule } from "../../types/rules.js";
export declare class EventFactorySpec implements Spec {
    private event;
    private ctx;
    constructor(event: EventSpec, ctx: VsaContext);
    factory(): AnyRule[];
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=event-factory-spec.d.ts.map