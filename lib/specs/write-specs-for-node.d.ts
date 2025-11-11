import type { CodyResponse } from "@proophboard/cody-types";
import type { NodeRecord } from "../proophboard/node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
import { type Spec, type SpecCollection } from "./spec.js";
import type { Tree } from "@nx/devkit";
export declare function writeSpecsForNode(node: NodeRecord<{}>, ctx: VsaContext): Promise<CodyResponse>;
export declare function writeSpec(spec: Spec | SpecCollection, ctx: VsaContext, tree: Tree): Promise<void>;
//# sourceMappingURL=write-specs-for-node.d.ts.map