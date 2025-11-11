import { type CodyResponse } from "@proophboard/cody-types";
export declare class CodyResponseException extends Error {
    codyResponse: CodyResponse;
    constructor(error: CodyResponse);
}
export declare const withErrorCheck: <T extends (...args: any) => any>(func: T, args: Parameters<T>) => Exclude<ReturnType<T>, CodyResponse>;
export declare const asyncWithErrorCheck: <T extends (...args: any) => Promise<any>>(func: T, args: Parameters<T>) => Promise<Exclude<Awaited<ReturnType<T>>, CodyResponse>>;
//# sourceMappingURL=error-handling.d.ts.map