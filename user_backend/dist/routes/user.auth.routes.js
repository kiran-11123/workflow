import { AuthController } from "../controllers/user.auth.controller.js";
import express from 'express';
const auth_router = express.Router();
const controller = new AuthController();
auth_router.post('/signin', controller.SigninController.bind(controller));
auth_router.post('/signup', controller.SignupController.bind(controller));
export default auth_router;
//# sourceMappingURL=user.auth.routes.js.map