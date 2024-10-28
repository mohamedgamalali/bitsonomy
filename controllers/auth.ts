import { NextFunction, Request, Response } from "express";
import { generateAuthTokens, InternalResponse, refreshAccessToken } from "../utils";
import { UserInstance } from "../models";
import bcrypt from 'bcryptjs';
export const postSignup = async (req: Request<object, object, { email: string, password: string, name: string }>, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await UserInstance.findOne({ email });
        if(existingUser) {
            throw new InternalResponse('USER_ALREADY_EXISTS');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new UserInstance({ email, password: hashedPassword, name }).save();
        res.status(201).json({
            message: 'User created successfully',
            email: user.email,
        });
    } catch (error) {
        return next(error);
    }
};

export const postLogin = async (req: Request<object, object, { email: string, password: string }>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await UserInstance.findOne({ email });
        if(!user) {
            throw new InternalResponse('USER_NOT_FOUND');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password ?? '');
        if(!isPasswordValid) {
            throw new InternalResponse('INVALID_CREDENTIALS');
        }
        res.status(200).json({
            message: 'User logged in successfully',
            email: user.email,
            ...generateAuthTokens({ userId: user._id.toString(), email: user.email }),
        });
    } catch (error) {
        return next(error);
    }
}

export const postRefreshToken = async (req: Request<object, object, { refresh_token: string }>, res: Response, next: NextFunction) => {
    try {
        const { refresh_token } = req.body;
        const tokens = refreshAccessToken(refresh_token);
        res.status(200).json(tokens);
    } catch (error) {
        return next(error);
    }
}