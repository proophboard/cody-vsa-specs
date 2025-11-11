import type { UiSchema } from "@rjsf/utils";
import type { JSONSchema7 } from "json-schema";
import type { VsaContext } from "../../vsa-cody-config.js";
export type UiSchemaTFunction = (uiSchema: UiSchema, key: string) => UiSchema;
export type JsonSchemaTFunction = (schema: JSONSchema7, key: string) => JSONSchema7;
export declare const isPropertyRef: (ref: string) => boolean;
export declare const splitPropertyRef: (ref: string) => [string, string];
export declare const resolveUiSchema: (schema: JSONSchema7, ctx: VsaContext) => UiSchema | undefined;
export declare const resolveRefs: (schema: JSONSchema7, ctx: VsaContext, isNested?: boolean) => JSONSchema7;
//# sourceMappingURL=resolve-refs.d.ts.map