import jwt from 'jsonwebtoken';
import { InternalResponse } from './responses';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

interface TokenPayload {
    userId: string;
    email: string;
}

/**
 * Generate access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
    } catch (error) {
        console.log('=> verifyAccessToken-error', error);
        throw new InternalResponse('UNAUTHORIZED');
    }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    } catch (error) {
        console.log('=> verifyRefreshToken-error', error);
        throw new InternalResponse('UNAUTHORIZED');
    }
};

/**
 * Generate both access and refresh tokens
 */
export const generateAuthTokens = (payload: TokenPayload) => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
        accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
        refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
    };
};

/**
 * Refresh access token using a valid refresh token
 * @throws Error if refresh token is invalid or expired
 */
export const refreshAccessToken = (refreshToken: string) => {
    try {
        const payload = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email
        });

        return {
            access_token: newAccessToken,
            refresh_token: generateRefreshToken({
                userId: payload.userId,
                email: payload.email,
            }),
            accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
            refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
        };
    } catch (error) {
        console.log('=> refreshAccessToken-error', error);
        throw new InternalResponse('UNAUTHORIZED');
    }
};
