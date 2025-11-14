import type { SpecCollection } from "./spec.js";
import type { JSONSchema7 } from "json-schema";
import type { UiSchema } from "@rjsf/utils";
import type { ValueObjectDescriptionFlags } from "../types/descriptions.js";
export declare class InformationSpec implements SpecCollection {
    metadata(): ValueObjectDescriptionFlags;
    name(): string;
    schema(): JSONSchema7;
    uiSchema(): UiSchema;
    specs(): never[];
    folderPath(): string;
}
//# sourceMappingURL=information-spec.d.ts.map