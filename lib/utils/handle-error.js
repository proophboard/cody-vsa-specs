import { CodyResponseType } from "@proophboard/cody-types";
import { CodyResponseException } from "./error-handling.js";
export function handleError(e) {
    if (e instanceof CodyResponseException) {
        return e.codyResponse;
    }
    console.error(e);
    if (e instanceof Error) {
        return {
            cody: `💥 An error occurred: ${e.message}`,
            details: e.stack,
            type: CodyResponseType.Error
        };
    }
    return {
        cody: `💥 An unknown error occurred: ${e}`,
        details: 'Check cody server logs for details!',
        type: CodyResponseType.Error
    };
}
//# sourceMappingURL=handle-error.js.map