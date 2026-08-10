import logger from "../utils/logger.setup.js";
import { AuthService } from "../services/user.auth.service.js";
const auth_service = new AuthService();
export class AuthController {
    async SigninController(req, res) {
        logger.info(`Entered into the SigninController`);
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                logger.info(`Required email and password`);
                return res.status(400).json({
                    message: 'Required Email and Password'
                });
            }
            const token = await auth_service.SiginService(email, password);
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600000
            });
            logger.info('User signed in successfully', { email });
            return res.status(200).json({
                message: 'User Signed In Successfully',
                token: token
            });
        }
        catch (er) {
            logger.info(`Error while user signin ${er}`);
            if (er.message === 'The user not registered') {
                return res.status(404).json({
                    message: 'The user not registered'
                });
            }
            else if (er.message === 'Invalid Credentials') {
                return res.status(400).json({
                    message: 'Invalid Credentials'
                });
            }
            else if (er.message === 'JWT_SECRET is missing') {
                return res.status(401).json({
                    message: 'JWT_SECRET is missing'
                });
            }
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}
//# sourceMappingURL=user.auth.controller.js.map