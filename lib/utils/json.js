import { stringify, parse } from "comment-json";
export function toJSON(ctx, value, replacer, space) {
    return ctx.disableJsonWithComments ? JSON.stringify(value, replacer, space) : stringify(value, replacer, space);
}
export function fromJSON(json, reviver, removesComments) {
    return parse(json, reviver, removesComments);
}
//# sourceMappingURL=json.js.map