import type {Filter} from "./filter-types.js";

export type Sort = 'asc' | 'desc';
export type FieldName = string;
export type AliasFieldNameMapping = {field: string; alias: string;};
export type PartialSelect = Array<FieldName|AliasFieldNameMapping|Lookup>;

export interface Lookup {
  lookup: string;
  alias?: string; /* Lookup collection alias */
  using?: string; /* Which query collection provides the localKey? Defaults to "local" alias */
  optional?: boolean; /* Local select is included in result set even if foreign doc cannot be found. */
  on: {
    localKey: string;
    foreignKey?: string;
    and?: Filter;
  },
  /* If lookup is optional and foreignDoc cannot be found, non-optional select fields are returned as NULL */
  select?: Array<FieldName|AliasFieldNameMapping>;
}

export const isAliasFieldNameMapping = (partialSelectItem: unknown): partialSelectItem is AliasFieldNameMapping => {
  return typeof partialSelectItem === "object" && !isLookup(partialSelectItem);
}

export const isLookup = (partialSelectItem: unknown): partialSelectItem is Lookup => {
  return typeof partialSelectItem === "object" && Object.keys(partialSelectItem as object).includes('lookup');
}

export interface SortOrderItem {
  prop: string;
  sort: Sort;
}
export type SortOrder = Array<SortOrderItem>;
