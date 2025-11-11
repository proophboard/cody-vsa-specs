import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { List } from "immutable";
import { getAbsoluteGraphPoint } from "@proophboard/cody-utils";
export const findParentByType = (node, type, ctx) => {
    if (node && node.getType() === type) {
        return node;
    }
    if (!node) {
        return null;
    }
    return findParentByType(node.getParent(), type, ctx);
};
export const getNodesOfTypeNearby = (node, type, nearbyPadding, ctx) => {
    const point = getAbsoluteGraphPoint(node);
    const mostLeft = point.x - nearbyPadding;
    const mostRight = point.x + nearbyPadding;
    const mostTop = point.y + nearbyPadding;
    const mostBottom = point.y - nearbyPadding;
    return ctx.syncedNodes.nodeMap().filter(n => n.getType() === type).filter(n => {
        const nPoint = getAbsoluteGraphPoint(n);
        return nPoint.x > mostLeft && nPoint.x < mostRight && nPoint.y < mostTop && nPoint.y > mostBottom;
    }).toList();
};
export const getNodeFromSyncedNodesByFQCN = (fqcn, type, ctx) => {
    const filteredNodes = ctx.syncedNodes.nodeMap().filter(otherNode => otherNode.getType() === type && otherNode.getFullQualifiedName(ctx.defaultSystemName) === fqcn);
    if (filteredNodes.count() > 0) {
        return filteredNodes.first();
    }
    return {
        cody: `Tried to find node by FQCN ${fqcn} of type ${type} in list of synced nodes. But it is not there.`,
        details: `Try to refresh prooph board and reconnect to Cody again!`,
        type: CodyResponseType.Error
    };
};
//# sourceMappingURL=node-tree.js.map