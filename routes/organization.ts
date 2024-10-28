import { Router } from "express";
import { postOrganization, getOrganizationById, getOrganizations, deleteOrganization, updateOrganization, inviteUserToOrganization } from "../controllers/organization";
import { validate } from "../utils";
import { inviteUserToOrganizationSchema, postOrganizationSchema, updateOrganizationSchema } from "../validation-schemas";
import { isAuthorized } from "../middlewares";
const router = Router();

router.post('/', isAuthorized, validate(postOrganizationSchema), postOrganization);
router.get('/:organization_id', isAuthorized, getOrganizationById);
router.get('/', isAuthorized, getOrganizations);
router.delete('/:organization_id', isAuthorized, deleteOrganization);
router.put('/:organization_id', isAuthorized, validate(updateOrganizationSchema), updateOrganization);
router.post('/:organization_id/invite', isAuthorized, validate(inviteUserToOrganizationSchema), inviteUserToOrganization);
module.exports = router;