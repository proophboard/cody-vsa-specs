import { toJSON } from "./json.js";
export const convertSpecToFileContent = (spec, ctx) => {
    return ctx.specContentConverter
        ? ctx.specContentConverter(spec, ctx)
        : toJSON(ctx, spec.toJSON(), null, 2);
};
//# sourceMappingURL=convert-spec-to-file-content.js.map