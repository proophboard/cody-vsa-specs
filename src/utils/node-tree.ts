import {
  type CodyResponse,
  CodyResponseType,
  NodeType
} from "@proophboard/cody-types";
import {List} from "immutable";
import {getAbsoluteGraphPoint} from "@proophboard/cody-utils";
import type {NodeRecord} from "../proophboard/node-record.js";
import type {VsaContext} from "../vsa-cody-config.js";

type Success = NodeRecord<any>;
type Error = CodyResponse;

export const findParentByType = (node: NodeRecord<any> | null, type: NodeType, ctx: VsaContext): NodeRecord<any> | null => {
  if(node && node.getType() === type) {
    return node;
  }

  if(!node) {
    return null;
  }

  return findParentByType(node.getParent(), type, ctx);
}

export const getNodesOfTypeNearby = (node: NodeRecord<any>, type: NodeType, nearbyPadding: number, ctx: VsaContext): List<NodeRecord<any>> => {
  const point = getAbsoluteGraphPoint(node);
  const mostLeft = point.x - nearbyPadding;
  const mostRight = point.x + nearbyPadding;
  const mostTop = point.y + nearbyPadding;
  const mostBottom = point.y - nearbyPadding;

  return ctx.syncedNodes.nodeMap().filter(n => n.getType() === type).filter(n => {
    const nPoint = getAbsoluteGraphPoint(n);

    return nPoint.x > mostLeft && nPoint.x < mostRight && nPoint.y < mostTop && nPoint.y > mostBottom;
  }).toList();
}

export const getNodeFromSyncedNodesByFQCN = (fqcn: string, type: NodeType, ctx: VsaContext): Success | Error => {
  const filteredNodes = ctx.syncedNodes.nodeMap().filter(otherNode => otherNode.getType() === type && otherNode.getFullQualifiedName(ctx.defaultSystemName) === fqcn);

  if(filteredNodes.count() > 0) {
    return filteredNodes.first();
  }

  return {
    cody: `Tried to find node by FQCN ${fqcn} of type ${type} in list of synced nodes. But it is not there.`,
    details: `Try to refresh prooph board and reconnect to Cody again!`,
    type: CodyResponseType.Error
  }
}


