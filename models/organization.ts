import { Schema, model } from "mongoose";
import { OrganizationDocument, OrganizationModel } from "./mongoose-types";

enum ACCESS_LEVELS {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

const organizationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    access_level: { type: String, default: 'public', enum: Object.values(ACCESS_LEVELS) },
}, { timestamps: true });

export const OrganizationInstance = model<OrganizationDocument, OrganizationModel>('Organization', organizationSchema);