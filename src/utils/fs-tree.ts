import type { Tree, FileChange } from "@nx/devkit";
import { FsTree } from "nx/src/generators/tree.js"
import fs from "node:fs";

export const listChangesForCodyResponse = (tree: Tree): string => {
  return tree.listChanges().map(change => `${change.type} ${change.path}`).join("\n");
}

export const isNewFile = (path: string, tree: Tree): boolean => {
  if(!tree.exists(path)) {
    return true;
  }

  let isNewFile = false;

  tree.listChanges().forEach(c => {
    if(c.path === path && c.type === "CREATE") {
      isNewFile = true;
    }
  });

  return isNewFile;
}

export const requireUncached = (module: string) => {
  delete require.cache[require.resolve(module)];
  return require(module);
}

export class CodyIgnoreAwareTree extends FsTree {
  public listChanges(): FileChange[] {
    const changes = super.listChanges();

    return changes.filter(change => {
      if(change.type === "CREATE") {
        return true;
      }

      try {
        const content = fs.readFileSync(`${this.root}/${change.path}`);
        return !content.toString().includes('@cody-ignore');
      } catch (e) {
        return true;
      }
    })
  }
}
