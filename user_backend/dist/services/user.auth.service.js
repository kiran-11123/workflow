import user_model from "../models/user.model.js";
import bcrypt from "bcryptjs";
import logger from "../utils/logger.setup.js";
import jwt from 'jsonwebtoken';
export class AuthService {
    async SiginService(email, password) {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const check_user = await user_model.findOne({ email: email });
            if (!check_user) {
                logger.info(`User with email ${email} does not have account`);
                throw new Error('The user not registered');
            }
            const check_password = await bcrypt.compare(password, check_user.password);
            if (!check_password) {
                logger.info(`Invalid Credentials`);
                throw new Error('Invalid Credentials');
            }
            if (!JWT_SECRET) {
                logger.info('JWT_SECRET is missing');
                throw new Error("JWT_SECRET is missing");
            }
            const user_details = { email: check_user.email, user_id: check_user._id };
            const token = jwt.sign(user_details, JWT_SECRET, { expiresIn: '1h' });
            return token;
        }
        catch (er) {
            logger.info(`Error while signing in , ${er}`);
            throw er;
        }
    }
}
//# sourceMappingURL=user.auth.service.js.map