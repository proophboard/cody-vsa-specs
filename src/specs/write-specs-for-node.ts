import type {CodyResponse} from "@proophboard/cody-types";
import type {NodeRecord} from "../proophboard/node-record.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {getChapterSpec} from "./inspection/get-chapter-spec.js";
import {getSliceSpec} from "./inspection/get-slice-spec.js";
import {isSpecCollection, makeNodeSpec, type Spec, type SpecCollection} from "./spec.js";
import type {Tree} from "@nx/devkit";
import {listChangesForCodyResponse} from "../utils/fs-tree.js";
import {formatFiles} from "@nx/devkit";
import {flushChanges} from "nx/src/generators/tree.js";

export async function writeSpecsForNode (node: NodeRecord<{}>, ctx: VsaContext): Promise<CodyResponse> {
  const chapter = getChapterSpec(node, ctx);
  const slice = getSliceSpec(node, chapter, ctx);
  const nodeSpec = makeNodeSpec(node, slice, ctx);

  const tree = ctx.tree();

  await writeSpec(chapter, ctx, tree);
  await writeSpec(slice, ctx, tree);
  await writeSpec(nodeSpec, ctx, tree);

  // @TODO: commandHandler, aggregate, projection

  await formatFiles(tree);

  const changes = tree.listChanges();

  flushChanges(tree.root, changes);

  return {
    cody: `🎉 Specs written for ${node.getType()} "${node.getName()}"`,
    details: listChangesForCodyResponse(tree)
  }
}

export async function writeSpec (spec: Spec | SpecCollection, ctx: VsaContext, tree: Tree): Promise<void> {
  if(isSpecCollection(spec)) {
    spec.specs().map(s => writeSpec(s, ctx, tree));
    return;
  }

  tree.write(spec.specFilePath(), spec.toSpecContent());
}
