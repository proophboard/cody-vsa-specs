export const isIfConditionRule = (rule) => {
    return typeof rule.if !== "undefined";
};
export const isIfNotConditionRule = (rule) => {
    return typeof rule.if_not !== "undefined";
};
export const isFilter = (then) => typeof then.filter !== 'undefined';
export const isForEach = (then) => typeof then.forEach !== 'undefined';
export const isRecordEvent = (then) => typeof then.record !== 'undefined';
export const isThrowError = (then) => typeof then.throw !== 'undefined';
export const isAssignVariable = (then) => typeof then.assign !== 'undefined';
export const isTriggerCommand = (then) => typeof then.trigger !== 'undefined';
export const isCallService = (then) => typeof then.call !== 'undefined';
export const isTryCatch = (then) => typeof then.try !== "undefined";
export const isFindInformation = (then) => typeof then.find !== "undefined";
export const isFindPartialInformation = (then) => typeof then.findPartial !== "undefined";
export const isFindInformationById = (then) => typeof then.findById !== "undefined";
export const isFindOneInformation = (then) => typeof then.findOne !== "undefined";
export const isFindPartialInformationById = (then) => typeof then.findPartialById !== "undefined";
export const isFindOnePartialInformation = (then) => typeof then.findOnePartial !== "undefined";
export const isLookupUsers = (then) => typeof then.lookup === "object" && typeof then.lookup.users !== "undefined";
export const isLookupUser = (then) => typeof then.lookup === "object" && typeof then.lookup.user !== "undefined";
export const isCountInformation = (then) => typeof then.count !== "undefined";
export const isInsertInformation = (then) => typeof then.insert !== 'undefined';
export const isUpsertInformation = (then) => typeof then.upsert !== 'undefined';
export const isUpdateInformation = (then) => typeof then.update !== 'undefined';
export const isReplaceInformation = (then) => typeof then.replace !== 'undefined';
export const isDeleteInformation = (then) => typeof then.delete !== 'undefined';
export const isExecuteRules = (then) => typeof then.execute !== 'undefined';
export const isLogMessage = (then) => typeof then.log !== 'undefined';
//# sourceMappingURL=rules.js.map