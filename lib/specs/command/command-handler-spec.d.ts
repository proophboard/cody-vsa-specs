import type { Spec } from "../spec.js";
import type { AnyRule } from "../../types/rules.js";
import type { CommandSpec } from "../command-spec.js";
import type { SliceSpec } from "../slice-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
export declare class CommandHandlerSpec implements Spec {
    private handledCommand;
    private handlerSlice;
    private handlingRules;
    private ctx;
    constructor(command: CommandSpec, slice: SliceSpec, rules: AnyRule[], ctx: VsaContext);
    rules(): AnyRule[];
    command(): CommandSpec;
    slice(): SliceSpec;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=command-handler-spec.d.ts.map