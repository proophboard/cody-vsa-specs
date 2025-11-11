import type { Tree, FileChange } from "@nx/devkit";
import { FsTree } from "nx/src/generators/tree.js";
export declare const listChangesForCodyResponse: (tree: Tree) => string;
export declare const isNewFile: (path: string, tree: Tree) => boolean;
export declare const requireUncached: (module: string) => any;
export declare class CodyIgnoreAwareTree extends FsTree {
    listChanges(): FileChange[];
}
//# sourceMappingURL=fs-tree.d.ts.map