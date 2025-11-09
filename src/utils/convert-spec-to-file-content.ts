import type {Spec} from "../specs/spec.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {toJSON} from "./json.js";

export type SpecContentConverter = (spec: Spec, ctx: VsaContext) => string;

export const convertSpecToFileContent = (spec: Spec, ctx: VsaContext ): string => {
  return ctx.specContentConverter
    ? ctx.specContentConverter(spec, ctx)
    : toJSON(ctx, spec.toJSON(), null, 2);
}
