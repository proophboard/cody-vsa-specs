import {stringify, parse, type Reviver} from "comment-json";
import type {VsaContext} from "../vsa-cody-config.js";

export function toJSON (
  ctx: VsaContext,
  value: unknown,
  replacer?: (
    (key: string, value: unknown) => unknown
    ) | Array<number | string> | null,
  space?: string | number
): string {
  return ctx.disableJsonWithComments ? JSON.stringify(value, replacer as any, space) : stringify(value, replacer, space);
}

export function fromJSON (
  json: string,
  reviver?: Reviver | null,
  removesComments?: boolean
) {
  return parse(json, reviver, removesComments);
}
