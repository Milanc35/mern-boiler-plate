import { HttpStatusCode } from "../utils/constant";
import BaseError from "./BaseError";

class APIError extends BaseError {
    constructor(name: string, httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER, isOperational:boolean = true, description: string) {
        super(name, httpCode, description, isOperational);
    }
}

export default APIError;