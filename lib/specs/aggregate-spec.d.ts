import type { Spec } from "./spec.js";
import type { VsaContext } from "../vsa-cody-config.js";
import type { StateSpec } from "./state-spec.js";
export declare class AggregateSpec implements Spec {
    private aggregateState;
    private ctx;
    constructor(state: StateSpec, ctx: VsaContext);
    name(): string;
    state(): StateSpec;
    identifier(): string;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=aggregate-spec.d.ts.map