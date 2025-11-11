import type { Spec } from "../spec.js";
import type { CommandSpec } from "../command-spec.js";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { UiSchema } from "@rjsf/utils";
export declare class CommandUiSchemaSpec implements Spec {
    private schemaCommand;
    private commandUiSchema;
    private ctx;
    constructor(schemaCommand: CommandSpec, uiSchema: UiSchema, ctx: VsaContext);
    uiSchema(): UiSchema;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=command-ui-schema-spec.d.ts.map