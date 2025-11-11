import type { Spec } from "../spec.js";
import type { CommandSpec } from "../command-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import { type AggregateCommandDescription, type CommandDescription, type PureCommandDescription, type StreamCommandDescription } from "../../types/descriptions.js";
export declare class CommandDescriptionSpec implements Spec {
    private command;
    private ctx;
    constructor(schemaCommand: CommandSpec, ctx: VsaContext);
    desc(): CommandDescription | AggregateCommandDescription | PureCommandDescription | StreamCommandDescription;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=command-description-spec.d.ts.map