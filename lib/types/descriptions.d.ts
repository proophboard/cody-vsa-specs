import type { ProophBoardDescription } from "../proophboard/description.js";
export type DependencyType = "query" | "service" | "events";
export interface Dependency {
    type: DependencyType;
    options?: Record<string, any>;
    alias?: string;
    if?: string;
}
export type DependencyRegistry = {
    [dependencyName: string]: Dependency | Dependency[];
};
export interface AggregateDescription extends ProophBoardDescription {
    name: string;
    identifier: string;
    collection: string;
    stream?: string;
    state: string;
}
export interface CommandDescription extends ProophBoardDescription {
    name: string;
    aggregateCommand: boolean;
    dependencies?: DependencyRegistry;
    streamCommand?: boolean;
}
export interface AggregateCommandDescription extends CommandDescription {
    newAggregate: boolean;
    aggregateName: string;
    aggregateIdentifier: string;
    persistState?: boolean;
    deleteState?: boolean;
    deleteHistory?: boolean;
}
export declare function isAggregateCommandDescription(desc: CommandDescription | AggregateCommandDescription): desc is AggregateCommandDescription;
export declare function isEntityCommandDescription(desc: CommandDescription | AggregateCommandDescription): desc is AggregateCommandDescription;
export interface StreamCommandDescription extends CommandDescription {
    streamIdExpr: string;
    streamName?: string;
    publicStream?: string;
}
export declare function isStreamCommandDescription(desc: CommandDescription | StreamCommandDescription): desc is StreamCommandDescription;
export interface PureCommandDescription extends CommandDescription {
    streamName?: string;
    publicStream?: string;
}
export declare function isPureCommandDescription(desc: CommandDescription | PureCommandDescription): desc is PureCommandDescription;
export interface EventDescription extends ProophBoardDescription {
    name: string;
    aggregateEvent: boolean;
    public: boolean;
}
export interface AggregateEventDescription extends EventDescription {
    aggregateName: string;
    aggregateIdentifier: string;
    aggregateState: string;
}
export interface QueryDescription extends ProophBoardDescription {
    name: string;
    returnType: string;
    dependencies?: DependencyRegistry;
}
export interface PolicyDescription extends ProophBoardDescription {
    name: string;
    dependencies?: DependencyRegistry;
    live?: boolean;
    projection?: string;
}
export interface ValueObjectDescriptionFlags {
    isList: boolean;
    hasIdentifier: boolean;
    isQueryable: boolean;
    isNotStored?: boolean;
    resolve?: {
        rules?: unknown[];
    };
}
export interface ValueObjectDescription extends ProophBoardDescription, ValueObjectDescriptionFlags {
    name: string;
    projection?: string;
}
export interface QueryableDescription extends ValueObjectDescription {
    query: string;
}
export interface QueryableValueObjectDescription extends QueryableDescription {
    collection: string;
}
export declare const isQueryableDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableDescription;
export declare const isQueryableValueObjectDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableValueObjectDescription;
export interface QueryableNotStoredValueObjectDescription extends ValueObjectDescription {
    query: string;
}
export declare const isQueryableNotStoredValueObjectDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableNotStoredValueObjectDescription;
export interface StateDescription extends ValueObjectDescription {
    identifier: string;
}
export declare const isStateDescription: (desc: ValueObjectDescriptionFlags) => desc is StateDescription;
export interface ListDescription extends ValueObjectDescription {
    itemType: string;
}
export declare const isListDescription: (desc: ValueObjectDescriptionFlags) => desc is ListDescription;
export interface StateListDescription extends ValueObjectDescription {
    itemIdentifier: string;
}
export declare const isStateListDescription: (desc: ValueObjectDescriptionFlags) => desc is StateListDescription;
export interface QueryableStateDescription extends StateDescription {
    query: string;
    collection: string;
}
export declare const isQueryableStateDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableStateDescription;
export interface QueryableStateDescriptionWithRules extends QueryableStateDescription {
    resolve: {
        rules: unknown[];
    };
}
export declare const isQueryableStateDescriptionWithRules: (desc: ValueObjectDescriptionFlags) => desc is QueryableStateDescriptionWithRules;
export interface QueryableNotStoredStateDescription extends StateDescription {
    query: string;
}
export declare const isQueryableNotStoredStateDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableNotStoredStateDescription;
export interface QueryableNotStoredStateListDescription extends StateListDescription {
    query: string;
    itemType: string;
}
export declare const isQueryableNotStoredStateListDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableNotStoredStateListDescription;
export interface QueryableStateListDescription extends StateListDescription {
    query: string;
    collection: string;
    itemType: string;
}
export declare const isQueryableStateListDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableStateListDescription;
export interface QueryableListDescription extends ValueObjectDescription {
    query: string;
    itemType: string;
}
export interface StoredQueryableListDescription extends ValueObjectDescription {
    query: string;
    itemType: string;
    collection: string;
}
export declare const isQueryableListDescription: (desc: ValueObjectDescriptionFlags) => desc is QueryableListDescription;
export declare const isStoredQueryableListDescription: (desc: ValueObjectDescriptionFlags) => desc is StoredQueryableListDescription;
export type ValueObjectDescriptionType = "ValueObjectDescription" | "ListDescription" | "StateDescription" | "StateListDescription" | "QueryableValueObjectDescription" | "QueryableNotStoredValueObjectDescription" | "QueryableStateDescription" | "QueryableNotStoredStateDescription" | "QueryableStateListDescription" | "QueryableNotStoredStateListDescription" | "QueryableListDescription" | "StoredQueryableListDescription";
export declare const detectDescriptionType: (desc: ValueObjectDescriptionFlags) => ValueObjectDescriptionType;
//# sourceMappingURL=descriptions.d.ts.map