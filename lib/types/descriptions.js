export function isAggregateCommandDescription(desc) {
    return desc.aggregateCommand;
}
export function isEntityCommandDescription(desc) {
    return isAggregateCommandDescription(desc) && !!desc.persistState;
}
export function isStreamCommandDescription(desc) {
    return !desc.aggregateCommand && !!desc.streamCommand;
}
export function isPureCommandDescription(desc) {
    return !isAggregateCommandDescription(desc) && !isStreamCommandDescription(desc);
}
export const isQueryableDescription = (desc) => {
    return desc.isQueryable;
};
export const isQueryableValueObjectDescription = (desc) => {
    return desc.isQueryable && !desc.hasIdentifier && !desc.isList && !desc.isNotStored;
};
export const isQueryableNotStoredValueObjectDescription = (desc) => {
    return desc.isQueryable && !desc.hasIdentifier && !desc.isList && !!desc.isNotStored;
};
export const isStateDescription = (desc) => {
    return desc.hasIdentifier && !desc.isList;
};
export const isListDescription = (desc) => {
    return desc.isList;
};
export const isStateListDescription = (desc) => {
    return desc.hasIdentifier && desc.isList;
};
export const isQueryableStateDescription = (desc) => {
    return isStateDescription(desc) && desc.isQueryable;
};
export const isQueryableStateDescriptionWithRules = (desc) => {
    return isQueryableStateDescription(desc) && !!desc.resolve && !!desc.resolve.rules && Array.isArray(desc.resolve.rules);
};
export const isQueryableNotStoredStateDescription = (desc) => {
    return isStateDescription(desc) && desc.isQueryable && !!desc.isNotStored;
};
export const isQueryableNotStoredStateListDescription = (desc) => {
    return isStateListDescription(desc) && !!desc.isNotStored && desc.isQueryable;
};
export const isQueryableStateListDescription = (desc) => {
    return isStateListDescription(desc) && desc.isQueryable && !desc.isNotStored;
};
export const isQueryableListDescription = (desc) => {
    return desc.isList && !desc.hasIdentifier && desc.isQueryable;
};
export const isStoredQueryableListDescription = (desc) => {
    return desc.isList && !desc.hasIdentifier && desc.isQueryable && !desc.isNotStored;
};
export const detectDescriptionType = (desc) => {
    switch (true) {
        case isQueryableStateListDescription(desc):
            return "QueryableStateListDescription";
        case isStoredQueryableListDescription(desc):
            return "StoredQueryableListDescription";
        case isQueryableListDescription(desc):
            return "QueryableListDescription";
        case isQueryableNotStoredStateListDescription(desc):
            return "QueryableNotStoredStateListDescription";
        case isQueryableNotStoredStateDescription(desc):
            return "QueryableNotStoredStateDescription";
        case isQueryableStateDescription(desc):
            return "QueryableStateDescription";
        case isStateListDescription(desc):
            return "StateListDescription";
        case isStateDescription(desc):
            return "StateDescription";
        case isQueryableValueObjectDescription(desc):
            return "QueryableValueObjectDescription";
        case isQueryableNotStoredValueObjectDescription(desc):
            return "QueryableNotStoredValueObjectDescription";
        case isListDescription(desc):
            return "ListDescription";
        default:
            return "ValueObjectDescription";
    }
};
//# sourceMappingURL=descriptions.js.map