import type {ProophBoardDescription} from "../proophboard/description.js";


export type DependencyType = "query" | "service" | "events";

export interface Dependency {
  type: DependencyType,
  options?: Record<string, any>,
  alias?: string,
  if?: string,
}

export type DependencyRegistry = {[dependencyName: string]: Dependency | Dependency[]}

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

export interface AggregateCommandDescription extends CommandDescription{
  newAggregate: boolean;
  aggregateName: string;
  aggregateIdentifier: string;
  persistState?: boolean;
  deleteState?: boolean;
  deleteHistory?: boolean;
}

export function isAggregateCommandDescription (desc: CommandDescription | AggregateCommandDescription): desc is AggregateCommandDescription {
  return desc.aggregateCommand;
}

export function isEntityCommandDescription (desc: CommandDescription | AggregateCommandDescription): desc is AggregateCommandDescription {
  return isAggregateCommandDescription(desc) && !!desc.persistState;
}

export interface StreamCommandDescription extends CommandDescription {
  streamIdExpr: string;
  streamName?: string;
  publicStream?: string;
}

export function isStreamCommandDescription (desc: CommandDescription | StreamCommandDescription): desc is StreamCommandDescription {
  return !desc.aggregateCommand && !!desc.streamCommand;
}

export interface PureCommandDescription extends CommandDescription {
  streamName?: string;
  publicStream?: string;
}

export function isPureCommandDescription (desc: CommandDescription | PureCommandDescription): desc is PureCommandDescription {
  return !isAggregateCommandDescription(desc) && !isStreamCommandDescription(desc);
}

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

export interface InformationDescriptionFlags {
  isList: boolean;
  hasIdentifier: boolean;
  isQueryable: boolean;
  isNotStored?: boolean;
  resolve?: {rules?: unknown[]};
}

export interface InformationDescription extends ProophBoardDescription, InformationDescriptionFlags {
  name: string;
  projection?: string;
}

export interface QueryableDescription extends InformationDescription {
  query: string;
}

export interface QueryableInformationDescription extends QueryableDescription {
  collection: string;
}

export const isQueryableDescription = (desc: InformationDescriptionFlags): desc is QueryableDescription => {
  return desc.isQueryable;
}

export const isQueryableInformationDescription = (desc: InformationDescriptionFlags): desc is QueryableInformationDescription => {
  return desc.isQueryable && !desc.hasIdentifier && !desc.isList && !desc.isNotStored;
}

export interface QueryableNotStoredInformationDescription extends InformationDescription {
  query: string;
}

export const isQueryableNotStoredInformationDescription = (desc: InformationDescriptionFlags): desc is QueryableNotStoredInformationDescription => {
  return desc.isQueryable && !desc.hasIdentifier && !desc.isList && !!desc.isNotStored;
}

export interface StateDescription extends InformationDescription {
  identifier: string;
}

export const isStateDescription = (desc: InformationDescriptionFlags): desc is StateDescription => {
  return desc.hasIdentifier && !desc.isList;
}

export interface ListDescription extends InformationDescription {
  itemType: string;
}

export const isListDescription = (desc: InformationDescriptionFlags): desc is ListDescription => {
  return desc.isList;
}

export interface StateListDescription extends InformationDescription{
  itemIdentifier: string;
}

export const isStateListDescription = (desc: InformationDescriptionFlags): desc is StateListDescription => {
  return desc.hasIdentifier && desc.isList;
}

export interface QueryableStateDescription extends StateDescription {
  query: string;
  collection: string;
}

export const isQueryableStateDescription = (desc: InformationDescriptionFlags): desc is QueryableStateDescription => {
  return isStateDescription(desc) && desc.isQueryable;
}

export interface QueryableStateDescriptionWithRules extends QueryableStateDescription {
  resolve: {
    rules: unknown[];
  }
}

export const isQueryableStateDescriptionWithRules = (desc: InformationDescriptionFlags): desc is QueryableStateDescriptionWithRules => {
  return isQueryableStateDescription(desc) && !!desc.resolve && !!desc.resolve.rules && Array.isArray(desc.resolve.rules);
}


export interface QueryableNotStoredStateDescription extends StateDescription {
  query: string;
}

export const isQueryableNotStoredStateDescription = (desc: InformationDescriptionFlags): desc is QueryableNotStoredStateDescription => {
  return isStateDescription(desc) && desc.isQueryable && !!desc.isNotStored;
}

export interface QueryableNotStoredStateListDescription extends StateListDescription {
  query: string;
  itemType: string;
}

export const isQueryableNotStoredStateListDescription = (desc: InformationDescriptionFlags): desc is QueryableNotStoredStateListDescription => {
  return isStateListDescription(desc) && !!desc.isNotStored && desc.isQueryable;
}

export interface QueryableStateListDescription extends StateListDescription {
  query: string;
  collection: string;
  itemType: string;
}

export const isQueryableStateListDescription = (desc: InformationDescriptionFlags): desc is QueryableStateListDescription => {
  return isStateListDescription(desc) && desc.isQueryable && !desc.isNotStored;
}

export interface QueryableListDescription extends InformationDescription {
  query: string;
  itemType: string;
}

export interface StoredQueryableListDescription extends InformationDescription {
  query: string;
  itemType: string;
  collection: string;
}

export const isQueryableListDescription = (desc: InformationDescriptionFlags): desc is QueryableListDescription => {
  return desc.isList && !desc.hasIdentifier && desc.isQueryable;
}

export const isStoredQueryableListDescription = (desc: InformationDescriptionFlags): desc is StoredQueryableListDescription => {
  return desc.isList && !desc.hasIdentifier && desc.isQueryable && !desc.isNotStored;
}

export type InformationDescriptionType = "InformationDescription" | "ListDescription" | "StateDescription" | "StateListDescription"
  | "QueryableInformationDescription" | "QueryableNotStoredInformationDescription"
  | "QueryableStateDescription" | "QueryableNotStoredStateDescription" | "QueryableStateListDescription"
  | "QueryableNotStoredStateListDescription" | "QueryableListDescription" | "StoredQueryableListDescription";

export const detectDescriptionType = (desc: InformationDescriptionFlags): InformationDescriptionType => {
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
    case isQueryableInformationDescription(desc):
      return "QueryableInformationDescription";
    case isQueryableNotStoredInformationDescription(desc):
      return "QueryableNotStoredInformationDescription";
    case isListDescription(desc):
      return "ListDescription";
    default:
      return "InformationDescription";
  }
}
