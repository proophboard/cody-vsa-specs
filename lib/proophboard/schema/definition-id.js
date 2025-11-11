import { startCase } from "lodash-es";
import { names } from "../../utils/names.js";
export const definitionId = (vo, ctx) => {
    const fqcn = vo.getFullQualifiedName(ctx.defaultSystemName);
    return `/definitions/${fqcn.split(".").map(p => names(p).fileName).join("/")}`;
};
export const fqcnFromDefinitionId = (definitionId) => {
    const withoutPrefix = definitionId.replace('/definitions/', '');
    const fqcnParts = withoutPrefix.split("/");
    return fqcnParts.map(p => names(p).className).join(".");
};
export const definitionIdFromFQCN = (fqcn) => {
    return '/definitions/' + fqcn
        .split(".")
        .map(r => names(r).fileName)
        .join("/");
};
export const nodeLabel = (nodeFQCN) => {
    if (nodeFQCN === '') {
        return '';
    }
    const parts = nodeFQCN.split(".");
    return startCase(parts.pop());
};
export const systemNameFromFQCN = (nodeFQCN) => {
    if (nodeFQCN === '') {
        return '';
    }
    const parts = nodeFQCN.split(".");
    return parts.shift() || '';
};
//# sourceMappingURL=definition-id.js.map