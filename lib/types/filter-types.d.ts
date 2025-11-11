export type Filter = AndFilter | OrFilter | NotFilter | AnyFilter | AnyOfDocIdFilter | AnyOfFilter | DocIdFilter | EqFilter | ExistsFilter | GteFilter | GtFilter | InArrayFilter | LikeFilter | LteFilter | LtFilter;
export interface AndFilter {
    and: Filter[];
}
export declare const isAndFilter: (filter: any) => filter is AndFilter;
export interface OrFilter {
    or: Filter[];
}
export declare const isOrFilter: (filter: any) => filter is OrFilter;
export interface NotFilter {
    not: Filter;
}
export declare const isNotFilter: (filter: any) => filter is NotFilter;
export interface AnyFilter {
    any: boolean;
}
export declare const isAnyFilter: (filter: any) => filter is AnyFilter;
export interface AnyOfDocIdFilter {
    anyOfDocId: string;
}
export declare const isAnyOfDocIdFilter: (filter: any) => filter is AnyOfDocIdFilter;
export interface AnyOfFilter {
    anyOf: {
        prop: string;
        valueList: string;
    };
}
export declare const isAnyOfFilter: (filter: any) => filter is AnyOfFilter;
export interface DocIdFilter {
    docId: string;
}
export declare const isDocIdFilter: (filter: any) => filter is DocIdFilter;
export interface EqFilter {
    eq: {
        prop: string;
        value: string;
    };
}
export declare const isEqFilter: (filter: any) => filter is EqFilter;
export interface ExistsFilter {
    exists: {
        prop: string;
    };
}
export declare const isExistsFilter: (filter: any) => filter is ExistsFilter;
export interface GteFilter {
    gte: {
        prop: string;
        value: string;
    };
}
export declare const isGteFilter: (filter: any) => filter is GteFilter;
export interface GtFilter {
    gt: {
        prop: string;
        value: string;
    };
}
export declare const isGtFilter: (filter: any) => filter is GtFilter;
export interface InArrayFilter {
    inArray: {
        prop: string;
        value: string;
    };
}
export declare const isInArrayFilter: (filter: any) => filter is InArrayFilter;
export interface LikeFilter {
    like: {
        prop: string;
        value: string;
    };
}
export declare const isLikeFilter: (filter: any) => filter is LikeFilter;
export interface LteFilter {
    lte: {
        prop: string;
        value: string;
    };
}
export declare const isLteFilter: (filter: any) => filter is LteFilter;
export interface LtFilter {
    lt: {
        prop: string;
        value: string;
    };
}
export declare const isLtFilter: (filter: any) => filter is LtFilter;
//# sourceMappingURL=filter-types.d.ts.map