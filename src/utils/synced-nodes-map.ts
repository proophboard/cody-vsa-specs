import {makeNodeRecordFromNode, type NodeRecord, type NodeRecordMetadata} from "../proophboard/node-record.js";
import {type Node, type NodeId, NodeType} from "@proophboard/cody-types";

/**
 * Mutable map of synced NodeRecords from prooph board
 *
 * The cody server expects an immutable map.
 * However, cody-vsa-specs injects a mutable map via cody.config.ts to allow
 * efficient navigation through the entire node graph.
 *
 */
export class SyncedNodesMap {
  private nodes: Record<string, NodeRecord<{}>> = {};

  public get <M extends NodeRecordMetadata>(nodeId: NodeId): NodeRecord<M> | undefined {
    const record = this.nodes[nodeId];

    if(record) {
      return record as NodeRecord<M>;
    }

    return undefined;
  }

  public set (nodeId: NodeId, node: Node): SyncedNodesMap {
    let parent = node.getParent();

    // Frames are not synced due to their potentially huge list of children,
    // so we add them manually to the synced nodes
    if(parent && (parent.getType() === NodeType.feature || parent.getType() === NodeType.boundedContext)) {
      if(this.nodes[parent.getId()]) {
        parent = this.nodes[parent.getId()]!;
      }
      this.set(parent.getId(), addChildIfNotExists(parent, node));
    }

    this.nodes[nodeId] = makeNodeRecordFromNode(node, this);
    return this;
  }

  public clear (): SyncedNodesMap {
    this.nodes = {};
    return this;
  }
}

const addChildIfNotExists = (parent: Node, child: Node): Node => {
  const existingChild = parent.getChildren().find(c => c.getId() === child.getId());

  if(!existingChild) {
    parent = parent.withChildren(parent.getChildren().push(child));
  }

  return parent;
}
