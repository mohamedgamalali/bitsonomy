import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { InternalResponse } from './responses';

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req, { allowUnknown: true, convert: true });
    if (error) {
        console.log('=> validate error', error.details);
        const validationError = new InternalResponse('VALIDATION_ERROR', { 
            key: error.details[0].context?.key,
            message: error.details[0].message,
        });
        return next(validationError);
    }
    next();
};
