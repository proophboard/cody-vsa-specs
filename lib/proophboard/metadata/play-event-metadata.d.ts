import type { AnyRule } from "../../types/rules.js";
import type { JSONSchema7 } from "json-schema";
import type { VsaContext } from "../../vsa-cody-config.js";
import type { CodyResponse } from "@proophboard/cody-types";
export interface RawEventMeta {
    schema: any;
    service?: string;
    public?: boolean;
    applyRules?: AnyRule[];
    factory?: AnyRule[];
}
export interface PlayEventMeta {
    public: boolean;
    fqcn: string;
    schema: JSONSchema7;
    service?: string;
    applyRules?: AnyRule[];
    factory?: AnyRule[];
}
export declare const playEventMetadata: (label: string, FQCN: string, meta: RawEventMeta | null, ctx: VsaContext) => PlayEventMeta | CodyResponse;
//# sourceMappingURL=play-event-metadata.d.ts.map