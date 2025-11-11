import type { JSONSchema7 } from "json-schema";
import { type ShorthandObject } from "../schema/json-schema-from-shorthand.js";
import type { UiSchema } from "@rjsf/utils";
import type { DependencyRegistry } from "../../types/descriptions.js";
import type { AnyRule } from "../../types/rules.js";
import type { CodyResponse } from "@proophboard/cody-types";
import type { VsaContext } from "../../vsa-cody-config.js";
export interface RawCommandMeta {
    schema: JSONSchema7 | ShorthandObject;
    newAggregate?: boolean;
    aggregateCommand?: boolean;
    service?: string;
    uiSchema?: UiSchema;
    dependencies?: DependencyRegistry;
    rules?: AnyRule[];
    persistState?: boolean;
    deleteState?: boolean;
    deleteHistory?: boolean;
    uiDisableFetchState?: boolean;
    streamId?: string;
    streamName?: string;
    publicStream?: string;
    factory?: AnyRule[];
}
export interface PlayCommandMeta {
    newAggregate: boolean;
    schema: JSONSchema7;
    aggregateCommand: boolean;
    streamCommand: boolean;
    service?: string;
    uiSchema?: UiSchema;
    dependencies?: DependencyRegistry;
    rules?: AnyRule[];
    persistState?: boolean;
    deleteState?: boolean;
    deleteHistory?: boolean;
    uiDisableFetchState?: boolean;
    streamId?: string;
    streamName?: string;
    publicStream?: string;
    factory?: AnyRule[];
}
export declare const playCommandMetadata: (label: string, FQCN: string, meta: RawCommandMeta | null, ctx: VsaContext) => PlayCommandMeta | CodyResponse;
//# sourceMappingURL=play-command-metadata.d.ts.map