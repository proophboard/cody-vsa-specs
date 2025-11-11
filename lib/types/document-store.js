export const isAliasFieldNameMapping = (partialSelectItem) => {
    return typeof partialSelectItem === "object" && !isLookup(partialSelectItem);
};
export const isLookup = (partialSelectItem) => {
    return typeof partialSelectItem === "object" && Object.keys(partialSelectItem).includes('lookup');
};
//# sourceMappingURL=document-store.js.map