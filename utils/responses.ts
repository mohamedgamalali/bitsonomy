export const RESPONSES_MAP = {
    USER_ALREADY_EXISTS: {
        status: 400,
        message: "User already exists with this email",
        errorCode: "USER_ALREADY_EXISTS",
    },
    USER_NOT_FOUND: {
        status: 404,
        message: "User not found with this email",
        errorCode: "USER_NOT_FOUND",
    },
    INVALID_CREDENTIALS: {
        status: 401,
        message: "Invalid credentials, check your email and password",
        errorCode: "INVALID_CREDENTIALS",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
        errorCode: "UNAUTHORIZED",
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Oops, something went wrong, please try again later or contact support",
        errorCode: "INTERNAL_SERVER_ERROR",
    },
    BAD_REQUEST: {
        status: 400,
        message: "Bad request",
        errorCode: "BAD_REQUEST",
    },
    SUCCESS: {
        status: 200,
        message: "Success",
        errorCode: undefined,
    },
    VALIDATION_ERROR: {
        status: 422,
        message: "Validation error",
        errorCode: "VALIDATION_ERROR",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not found",
        errorCode: "NOT_FOUND",
    },
    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
        errorCode: "FORBIDDEN",
    },
};

export class InternalResponse {
    status: number;
    message: string;
    errorCode?: string;
    body?: any;
    constructor(response: keyof typeof RESPONSES_MAP, body?: any) {
        const responseData = RESPONSES_MAP[response];
        this.status = responseData.status;
        this.message = responseData.message;
        this.errorCode = responseData.errorCode;
        this.body = body;
    }
}

export const buildResponseFromError = (error: any) => {
    if(error instanceof InternalResponse) {
        return error;
    }
    return new InternalResponse('INTERNAL_SERVER_ERROR');
}