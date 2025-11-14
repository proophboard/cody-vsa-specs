import type { Spec } from "../spec.js";
import type { EventSpec } from "../event-spec.js";
import type { JSONSchema7 } from "json-schema";
import type { VsaContext } from "../../vsa-cody-config.js";
export declare class EventSchemaSpec implements Spec {
    private schemaEvent;
    private jsonSchema;
    private ctx;
    constructor(schemaEvent: EventSpec, jsonSchema: JSONSchema7, ctx: VsaContext);
    schema(): JSONSchema7;
    folderPath(): string;
    specFilePath(): string;
    toJSON(): object;
    toSpecContent(): string;
}
//# sourceMappingURL=event-schema-spec.d.ts.map