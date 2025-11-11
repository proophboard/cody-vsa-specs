import type { Spec } from "../spec.js";
import type { CommandSpec } from "../command-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { AnyRule } from "../../types/rules.js";
export declare class CommandFactorySpec implements Spec {
    private command;
    private ctx;
    constructor(command: CommandSpec, ctx: VsaContext);
    factory(): AnyRule[];
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=command-factory-spec.d.ts.map