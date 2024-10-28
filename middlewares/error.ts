import { buildResponseFromError } from "../utils";
import { NextFunction, Request, Response } from "express";
export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('=> express error', error);
    const response = buildResponseFromError(error);
    res.status(response.status).json({
        message: response.message,
        errorCode: response.errorCode,
        body: response.body,
    });
}
