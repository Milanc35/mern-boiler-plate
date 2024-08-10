
import BaseError from "../exceptions/BaseError";
import logger from "./logger";

class ErrorHandler {
    public async handleError(err: Error): Promise<void> {
        if (!this.isTrustedError(err)) {
            logger.error({
                type: err.name,
                httpCode: err.message,
                stack: err.stack || '',
            });
        }
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

export const errorHandler = new ErrorHandler();