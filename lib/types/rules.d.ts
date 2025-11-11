import type { Filter } from "./filter-types.js";
import type { PartialSelect, SortOrder } from "./document-store.js";
export type RuleType = 'always' | 'condition';
export type AnyRule = AlwaysRule | ConditionRule;
export interface Rule {
    rule: RuleType;
    then: ThenType;
}
export type AlwaysRule = Rule;
export type ConditionRule = IfConditionRule | IfNotConditionRule;
export interface IfConditionRule extends Rule {
    if: string;
    else?: ThenType;
    stop?: boolean;
}
export declare const isIfConditionRule: (rule: any) => rule is IfConditionRule;
export interface IfNotConditionRule extends Rule {
    if_not: string;
    else?: ThenType;
    stop?: boolean;
}
export declare const isIfNotConditionRule: (rule: any) => rule is IfNotConditionRule;
export type ThenType = ThenRecordEvent | ThenThrowError | ThenAssignVariable | ThenTriggerCommand | ThenCallService | ThenExecuteRules | ThenForEach | ThenTryCatch | ThenFilter | ThenFindInformation | ThenFindPartialInformation | ThenFindOneInformation | ThenFindOnePartialInformation | ThenFindInformationById | ThenFindPartialInformationById | ThenCountInformation | ThenInsertInformation | ThenUpsertInformation | ThenUpdateInformation | ThenReplaceInformation | ThenDeleteInformation | ThenLookupUsers | ThenLookupUser | ThenLogMessage;
export type PropMapping = {
    [name: string]: string | string[] | PropMapping | PropMapping[];
};
export interface ThenFilter {
    filter: Filter;
}
export declare const isFilter: (then: ThenType & {
    filter?: Filter;
}) => then is ThenFilter;
export interface ThenForEach {
    forEach: {
        variable: string;
        of?: string;
        then: ThenType;
    };
}
export declare const isForEach: (then: any) => then is ThenForEach;
export interface ThenRecordEvent {
    record: {
        event: string;
        mapping: string | PropMapping;
        meta?: string | PropMapping;
    };
}
export declare const isRecordEvent: (then: any) => then is ThenRecordEvent;
export interface ThenThrowError {
    throw: {
        error: string;
    };
}
export declare const isThrowError: (then: any) => then is ThenThrowError;
export interface ThenAssignVariable {
    assign: {
        variable: string;
        value: string | PropMapping;
    };
}
export declare const isAssignVariable: (then: any) => then is ThenAssignVariable;
export interface ThenTriggerCommand {
    trigger: {
        command: string;
        mapping: string | PropMapping;
        meta?: string | PropMapping;
    };
}
export declare const isTriggerCommand: (then: any) => then is ThenTriggerCommand;
export interface ThenCallService {
    call: {
        service: string;
        arguments?: string | string[] | PropMapping | PropMapping[];
        method?: string;
        async?: boolean;
        result?: {
            variable: string;
            mapping?: string | string[] | PropMapping | PropMapping[];
        };
    };
}
export declare const isCallService: (then: any) => then is ThenCallService;
export interface ThenTryCatch {
    try: {
        then: ThenType;
        catch?: {
            then: ThenType;
        };
        finally?: {
            then: ThenType;
        };
    };
}
export declare const isTryCatch: (then: any) => then is ThenTryCatch;
export interface ThenFindInformation {
    find: {
        information: string;
        filter: Filter;
        skip?: number;
        limit?: number;
        orderBy?: SortOrder;
        variable?: string;
    };
}
export declare const isFindInformation: (then: any) => then is ThenFindInformation;
export interface ThenFindPartialInformation {
    findPartial: {
        information: string;
        select: PartialSelect;
        filter: Filter;
        skip?: number;
        limit?: number;
        orderBy?: SortOrder;
        variable?: string;
    };
}
export declare const isFindPartialInformation: (then: any) => then is ThenFindPartialInformation;
export interface ThenFindInformationById {
    findById: {
        information: string;
        id: string;
        variable?: string;
    };
}
export declare const isFindInformationById: (then: any) => then is ThenFindInformationById;
export interface ThenFindOneInformation {
    findOne: {
        information: string;
        filter: Filter;
        variable?: string;
    };
}
export declare const isFindOneInformation: (then: any) => then is ThenFindOneInformation;
export interface ThenFindPartialInformationById {
    findPartialById: {
        information: string;
        id: string;
        select: PartialSelect;
        variable?: string;
    };
}
export declare const isFindPartialInformationById: (then: any) => then is ThenFindPartialInformationById;
export interface ThenFindOnePartialInformation {
    findOnePartial: {
        information: string;
        select: PartialSelect;
        filter: Filter;
        variable?: string;
    };
}
export declare const isFindOnePartialInformation: (then: any) => then is ThenFindOnePartialInformation;
export interface ThenLookupUsers {
    lookup: {
        users: {
            filter: Filter;
            skip?: number;
            limit?: number;
            orderBy?: SortOrder;
            variable?: string;
        };
    };
}
export declare const isLookupUsers: (then: any) => then is ThenLookupUsers;
export interface ThenLookupUser {
    lookup: {
        user: string;
        variable?: string;
    };
}
export declare const isLookupUser: (then: any) => then is ThenLookupUser;
export interface ThenCountInformation {
    count: {
        information: string;
        filter: Filter;
        variable?: string;
    };
}
export declare const isCountInformation: (then: any) => then is ThenCountInformation;
export interface ThenInsertInformation {
    insert: {
        information: string;
        id: string;
        set: string | PropMapping;
        meta?: string | PropMapping;
        version?: number;
    };
}
export declare const isInsertInformation: (then: any) => then is ThenInsertInformation;
export interface ThenUpsertInformation {
    upsert: {
        information: string;
        id: string;
        set: string | PropMapping;
        meta?: string | PropMapping;
        version?: number;
    };
}
export declare const isUpsertInformation: (then: any) => then is ThenUpsertInformation;
export interface ThenUpdateInformation {
    update: {
        information: string;
        filter: Filter;
        set: string | PropMapping;
        meta?: string | PropMapping;
        version?: number;
        loadDocIntoVariable?: string;
    };
}
export declare const isUpdateInformation: (then: any) => then is ThenUpdateInformation;
export interface ThenReplaceInformation {
    replace: {
        information: string;
        filter: Filter;
        set: string | PropMapping;
        meta?: string | PropMapping;
        version?: number;
        loadDocIntoVariable?: string;
    };
}
export declare const isReplaceInformation: (then: any) => then is ThenReplaceInformation;
export interface ThenDeleteInformation {
    delete: {
        information: string;
        filter: Filter;
    };
}
export declare const isDeleteInformation: (then: any) => then is ThenDeleteInformation;
export interface ThenExecuteRules {
    execute: {
        rules: Rule[];
    };
}
export declare const isExecuteRules: (then: any) => then is ThenExecuteRules;
export interface ThenLogMessage {
    log: {
        msg: string | string[];
        logLevel?: 'info' | 'error' | 'warn';
    };
}
export declare const isLogMessage: (then: any) => then is ThenLogMessage;
//# sourceMappingURL=rules.d.ts.map