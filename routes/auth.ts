import { Router } from "express";
import { postLogin, postRefreshToken, postSignup } from "../controllers/auth";
import { validate } from "../utils";
import { loginSchema, refreshTokenSchema, signupSchema } from "../validation-schemas";
const router = Router();

router.post('/signup', validate(signupSchema), postSignup);
router.post('/signin', validate(loginSchema), postLogin);
router.post('/refresh-token', validate(refreshTokenSchema), postRefreshToken);
module.exports = router;