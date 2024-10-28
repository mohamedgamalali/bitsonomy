import Joi from 'joi';

export const userEmail = Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    });

export const signupSchema = Joi.object({
    body: Joi.object({
        email: userEmail,
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*().,\-_/\\])[A-Za-z\d!@#$%^&*().,\-_/\\]{8,}$/)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            }),
        name: Joi.string()
            .required()
            .messages({
                'string.empty': 'Name is required',
                'any.required': 'Name is required'
            })
    })
});

export const loginSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

export const refreshTokenSchema = Joi.object({
    body: Joi.object({
        refresh_token: Joi.string().required(),
    }),
});