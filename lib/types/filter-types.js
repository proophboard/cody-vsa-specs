export const isAndFilter = (filter) => {
    return typeof filter.and !== "undefined";
};
export const isOrFilter = (filter) => {
    return typeof filter.or !== "undefined";
};
export const isNotFilter = (filter) => {
    return typeof filter.not !== "undefined";
};
export const isAnyFilter = (filter) => {
    return typeof filter.any !== "undefined";
};
export const isAnyOfDocIdFilter = (filter) => {
    return typeof filter.anyOfDocId !== "undefined";
};
export const isAnyOfFilter = (filter) => {
    return typeof filter.anyOf !== "undefined";
};
export const isDocIdFilter = (filter) => {
    return typeof filter.docId !== "undefined";
};
export const isEqFilter = (filter) => {
    return typeof filter.eq !== "undefined";
};
export const isExistsFilter = (filter) => {
    return typeof filter.exists !== "undefined";
};
export const isGteFilter = (filter) => {
    return typeof filter.gte !== "undefined";
};
export const isGtFilter = (filter) => {
    return typeof filter.gt !== "undefined";
};
export const isInArrayFilter = (filter) => {
    return typeof filter.inArray !== "undefined";
};
export const isLikeFilter = (filter) => {
    return typeof filter.like !== "undefined";
};
export const isLteFilter = (filter) => {
    return typeof filter.lte !== "undefined";
};
export const isLtFilter = (filter) => {
    return typeof filter.lt !== "undefined";
};
//# sourceMappingURL=filter-types.js.map