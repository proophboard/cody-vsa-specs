import type {NodeRecord} from "../proophboard/node-record.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {CodyResponseType, NodeType} from "@proophboard/cody-types";
import {CommandSpec} from "./command-spec.js";
import type {SliceSpec} from "./slice-spec.js";
import {CodyResponseException} from "../utils/error-handling.js";

export interface Spec {
  toJSON: () => object;
  toSpecContent: () => string;
  folderPath: () => string;
  specFilePath: () => string;
}

export interface SpecCollection {
  folderPath: () => string;
  specs: () => Spec[];
}

export function isSpecCollection (spec: any): spec is SpecCollection {
  return typeof spec.specs === "function";
}


export function makeNodeSpec (node: NodeRecord<any>, slice: SliceSpec, ctx: VsaContext): Spec | SpecCollection {
  switch (node.getType()) {
    case NodeType.command:
      return new CommandSpec(node, slice, ctx);
  }

  throw new CodyResponseException({
    type: CodyResponseType.Error,
    cody: `Unsupported node given. Can't make a spec for the node type "${node.getType()}" of node "${node.getName()}"`,
  })
}
