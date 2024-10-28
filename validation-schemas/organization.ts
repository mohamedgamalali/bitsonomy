import Joi from "joi";
import { userEmail } from "./auth";
export const postOrganizationSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
});

export const updateOrganizationSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
});

export const inviteUserToOrganizationSchema = Joi.object({
    body: Joi.object({
        email: userEmail,
    }),
});