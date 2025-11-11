import { makeNodeRecordFromNode } from "../proophboard/node-record.js";
import { NodeType } from "@proophboard/cody-types";
import { Map } from "immutable";
/**
 * Mutable map of synced NodeRecords from prooph board
 *
 * The cody server expects an immutable map.
 * However, cody-vsa-specs injects a mutable map via cody.config.ts to allow
 * efficient navigation through the entire node graph.
 *
 */
export class SyncedNodesMap {
    defaultSystemName;
    nodes = {};
    types = {};
    constructor(defaultSystemName) {
        this.defaultSystemName = defaultSystemName;
    }
    get(nodeId) {
        const record = this.nodes[nodeId];
        if (record) {
            return record;
        }
        return undefined;
    }
    set(nodeId, node) {
        let parent = node.getParent();
        // Frames are not synced due to their potentially huge list of children,
        // so we add them manually to the synced nodes
        if (parent && (parent.getType() === NodeType.feature || parent.getType() === NodeType.boundedContext)) {
            if (this.nodes[parent.getId()]) {
                parent = this.nodes[parent.getId()];
            }
            this.set(parent.getId(), addChildIfNotExists(parent, node));
        }
        const record = makeNodeRecordFromNode(node, this);
        this.nodes[nodeId] = record;
        if (record.getType() === NodeType.document) {
            this.types[record.getFullQualifiedName(this.defaultSystemName)] = record;
        }
        return this;
    }
    nodeMap() {
        return Map(this.nodes);
    }
    clear() {
        this.nodes = {};
        this.types = {};
        return this;
    }
    getTypes() {
        return this.types;
    }
}
const addChildIfNotExists = (parent, child) => {
    const existingChild = parent.getChildren().find(c => c.getId() === child.getId());
    if (!existingChild) {
        parent = parent.withChildren(parent.getChildren().push(child));
    }
    return parent;
};
//# sourceMappingURL=synced-nodes-map.js.map