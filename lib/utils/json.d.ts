import { type Reviver } from "comment-json";
import type { VsaContext } from "../vsa-cody-config.js";
export declare function toJSON(ctx: VsaContext, value: unknown, replacer?: ((key: string, value: unknown) => unknown) | Array<number | string> | null, space?: string | number): string;
export declare function fromJSON(json: string, reviver?: Reviver | null, removesComments?: boolean): import("comment-json").CommentJSONValue;
//# sourceMappingURL=json.d.ts.map