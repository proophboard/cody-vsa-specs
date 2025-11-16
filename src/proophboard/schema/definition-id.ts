
import {startCase} from "lodash-es";
import type {VsaContext} from "../../vsa-cody-config.js";
import {names} from "../../utils/names.js";
import type {NodeRecord} from "../node-record.js";

export const definitionId = (vo: NodeRecord<any>, ctx: VsaContext): string => {
  const fqcn = vo.getFullQualifiedName(ctx.defaultSystemName);

  return `/definitions/${fqcn.split(".").map(p => names(p).fileName).join("/")}`;
}

export const fqcnFromDefinitionId = (definitionId: string): string => {
  const withoutPrefix = definitionId.replace('/definitions/', '');

  const fqcnParts = withoutPrefix.split("/");

  return fqcnParts.map(p => names(p).className).join(".");
}

export const definitionIdFromFQCN = (fqcn: string): string => {
  return '/definitions/' + fqcn
    .split(".")
    .map(r => names(r).fileName)
    .join("/");
}

export const nodeLabel = (nodeFQCN: string): string => {
  if(nodeFQCN === '') {
    return '';
  }

  const parts = nodeFQCN.split(".");

  return startCase(parts.pop());
}

export const systemNameFromFQCN = (nodeFQCN: string): string => {
  if(nodeFQCN === '') {
    return '';
  }

  const parts = nodeFQCN.split(".");

  return parts.shift() || '';
}


