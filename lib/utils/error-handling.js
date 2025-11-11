import {} from "@proophboard/cody-types";
import { isCodyError } from "@proophboard/cody-utils";
export class CodyResponseException extends Error {
    codyResponse;
    constructor(error) {
        super();
        this.codyResponse = error;
    }
}
export const withErrorCheck = (func, args) => {
    const res = func.apply(func, args);
    if (isCodyError(res)) {
        throw new CodyResponseException(res);
    }
    return res;
};
export const asyncWithErrorCheck = async (func, args) => {
    const res = await func.apply(func, args);
    if (isCodyError(res)) {
        throw new CodyResponseException(res);
    }
    return res;
};
//# sourceMappingURL=error-handling.js.map