import type { JSONSchema7 } from "json-schema";
import { type CodyResponse } from "@proophboard/cody-types";
export declare const NAMESPACE = "namespace";
export interface ShorthandObject {
    [property: string]: ShorthandObject | string;
}
export declare const isRootNamespace: (ref: string) => boolean;
export declare const convertShorthandObjectToJsonSchema: (shorthand: ShorthandObject, namespace?: string) => JSONSchema7 | CodyResponse;
export declare const convertShorthandStringToJsonSchema: (shorthand: string, namespace: string) => JSONSchema7 | CodyResponse;
export declare const parseShorthandValidation: (validation: string) => [string, string | number | boolean | {
    $data: string;
}] | CodyResponse;
export declare const jsonSchemaFromShorthand: (shorthand: string | ShorthandObject, namespace: string) => JSONSchema7 | CodyResponse;
//# sourceMappingURL=json-schema-from-shorthand.d.ts.map