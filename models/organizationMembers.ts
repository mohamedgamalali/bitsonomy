import { Schema, model } from "mongoose";
import { OrganizationMemberDocument, OrganizationMemberModel } from "./mongoose-types";

const organizationMemberSchema = new Schema({
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

organizationMemberSchema.index({ organizationId: 1, userId: 1 }, { unique: true });
organizationMemberSchema.index({ userId: 1 });
organizationMemberSchema.index({ organizationId: 1 });

export const OrganizationMemberInstance = model<OrganizationMemberDocument, OrganizationMemberModel>('OrganizationMember', organizationMemberSchema);
