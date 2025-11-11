import { FsTree } from "nx/src/generators/tree.js";
import fs from "node:fs";
export const listChangesForCodyResponse = (tree) => {
    return tree.listChanges().map(change => `${change.type} ${change.path}`).join("\n");
};
export const isNewFile = (path, tree) => {
    if (!tree.exists(path)) {
        return true;
    }
    let isNewFile = false;
    tree.listChanges().forEach(c => {
        if (c.path === path && c.type === "CREATE") {
            isNewFile = true;
        }
    });
    return isNewFile;
};
export const requireUncached = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
};
export class CodyIgnoreAwareTree extends FsTree {
    listChanges() {
        const changes = super.listChanges();
        return changes.filter(change => {
            if (change.type === "CREATE") {
                return true;
            }
            try {
                const content = fs.readFileSync(`${this.root}/${change.path}`);
                return !content.toString().includes('@cody-ignore');
            }
            catch (e) {
                return true;
            }
        });
    }
}
//# sourceMappingURL=fs-tree.js.map