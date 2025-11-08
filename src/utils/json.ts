import {stringify, parse, type Reviver} from "comment-json";

export function toJSON (
  value: unknown,
  replacer?: (
    (key: string, value: unknown) => unknown
    ) | Array<number | string> | null,
  space?: string | number
): string {
  return stringify(value, replacer, space);
}

export function fromJSON (
  json: string,
  reviver?: Reviver | null,
  removesComments?: boolean
) {
  return parse(json, reviver, removesComments);
}
