import { OrganizationInstance, OrganizationMemberInstance, UserInstance } from "../models";
import { Request, Response, NextFunction } from "express";
import { InternalResponse } from "../utils";

export const postOrganization = async (req: Request<object, object, {name: string, description: string}>, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const organization = await new OrganizationInstance({ name, description }).save();
        if (organization) {
            await new OrganizationMemberInstance({ organizationId: organization._id, userId: req.user?.userId }).save();
        }
        res.status(201).json({
            organization_id: organization._id,
        });
    } catch (error) {
        return next(error);
    }
}

export const getOrganizationById = async (req: Request<{organization_id: string}>, res: Response, next: NextFunction) => {
    try {
        const { organization_id } = req.params;
        const organization = await OrganizationInstance.findById(organization_id);
        if (!organization) {
            throw new InternalResponse('NOT_FOUND');
        }
        const organizationMembers = await OrganizationMemberInstance.find({ organizationId: organization._id });
        res.status(200).json({
            organization,
            organizationMembers,
        });
    } catch (error) {
        return next(error);
    }
}

export const getOrganizations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationMembers = await OrganizationMemberInstance.find({ userId: req.user?.userId });
        const organizations = await OrganizationInstance.find({ _id: { $in: organizationMembers.map(member => member.organizationId) } });
        res.status(200).json(organizations);
    } catch (error) {
        return next(error);
    }
}

export const deleteOrganization = async (req: Request<{organization_id: string}>, res: Response, next: NextFunction) => {
    try {
        const { organization_id } = req.params;
        const organization = await OrganizationInstance.findById(organization_id);
        if (!organization) {
            throw new InternalResponse('NOT_FOUND');
        }
        const isMember = await OrganizationMemberInstance.findOne({ organizationId: organization._id, userId: req.user?.userId });
        if (!isMember) {
            throw new InternalResponse('FORBIDDEN', { message: 'You are not a member of this organization' });
        }
        await OrganizationInstance.findByIdAndDelete(organization_id);
        await OrganizationMemberInstance.deleteMany({ organizationId: organization._id });
        res.status(200).json({ message: 'Organization deleted' });
    } catch (error) {
        return next(error);
    }
}

export const updateOrganization = async (req: Request<{organization_id: string}, object, {name: string, description: string}>, res: Response, next: NextFunction) => {
    try {
        const { organization_id } = req.params;
        const { name, description } = req.body;
        const organization = await OrganizationInstance.findById(organization_id);
        if (!organization) {
            throw new InternalResponse('NOT_FOUND');
        }
        const isMember = await OrganizationMemberInstance.findOne({ organizationId: organization._id, userId: req.user?.userId });
        if (!isMember) {
            throw new InternalResponse('FORBIDDEN', { message: 'You are not a member of this organization' });
        }
        const updatedOrg = await OrganizationInstance.findByIdAndUpdate(organization_id, { name, description }, { new: true });
        res.status(200).json({ message: 'Organization updated', organization: updatedOrg });
    } catch (error) {
        return next(error);
    }
}

export const inviteUserToOrganization = async (req: Request<{organization_id: string}, object, {email: string}>, res: Response, next: NextFunction) => {
    try {
        const { organization_id } = req.params;
        const { email } = req.body;
        const organization = await OrganizationInstance.findById(organization_id);
        if (!organization) {
            throw new InternalResponse('NOT_FOUND');
        }
        const tempUser = await UserInstance.createTemporaryUser(email);
        const isAlreadyMember = await OrganizationMemberInstance.findOne({ organizationId: organization._id, userId: tempUser._id });
        if (isAlreadyMember) {
            throw new InternalResponse('BAD_REQUEST', { message: 'User already exists in this organization' });
        }
        await new OrganizationMemberInstance({ organizationId: organization._id, userId: tempUser._id }).save();
        res.status(200).json({ message: 'User invited to organization' });
    } catch (error) {
        return next(error);
    }
}