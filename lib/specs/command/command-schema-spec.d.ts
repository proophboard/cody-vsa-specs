import type { Spec } from "../spec.js";
import type { CommandSpec } from "../command-spec.js";
import type { JSONSchema7 } from "json-schema";
import type { VsaContext } from "../../vsa-cody-config.js";
export declare class CommandSchemaSpec implements Spec {
    private schemaCommand;
    private jsonSchema;
    private ctx;
    constructor(schemaCommand: CommandSpec, jsonSchema: JSONSchema7, ctx: VsaContext);
    schema(): JSONSchema7;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=command-schema-spec.d.ts.map