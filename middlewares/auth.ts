import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/auth';
import { InternalResponse } from '../utils';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                [key: string]: any;
            };
        }
    }
}

export const isAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new InternalResponse('UNAUTHORIZED');
        }

        const token = authHeader.split(' ')[1];

        try {
            const userData = verifyAccessToken(token);
            
            req.user = userData;
            return next();
        } catch (error) {
            throw new InternalResponse('UNAUTHORIZED');
        }
    } catch (error) {
        return next(error);
    }
};

