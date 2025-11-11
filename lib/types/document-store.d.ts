import type { Filter } from "./filter-types.js";
export type Sort = 'asc' | 'desc';
export type FieldName = string;
export type AliasFieldNameMapping = {
    field: string;
    alias: string;
};
export type PartialSelect = Array<FieldName | AliasFieldNameMapping | Lookup>;
export interface Lookup {
    lookup: string;
    alias?: string;
    using?: string;
    optional?: boolean;
    on: {
        localKey: string;
        foreignKey?: string;
        and?: Filter;
    };
    select?: Array<FieldName | AliasFieldNameMapping>;
}
export declare const isAliasFieldNameMapping: (partialSelectItem: unknown) => partialSelectItem is AliasFieldNameMapping;
export declare const isLookup: (partialSelectItem: unknown) => partialSelectItem is Lookup;
export interface SortOrderItem {
    prop: string;
    sort: Sort;
}
export type SortOrder = Array<SortOrderItem>;
//# sourceMappingURL=document-store.d.ts.map