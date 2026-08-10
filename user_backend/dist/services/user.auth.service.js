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
    async SignUpService(email, username, password) {
        try {
            logger.info('Registering new user', { email, username });
            const existing_user = await user_model.findOne({
                $or: [
                    { email },
                    { username }
                ]
            });
            if (existing_user) {
                if (existing_user.email === email) {
                    logger.warn('Sign up failed: user already registered', { email });
                    throw new Error("User Already Registered");
                }
                if (existing_user.username === username) {
                    logger.warn('Sign up failed: username already taken', { username });
                    throw new Error("Username Already Taken");
                }
            }
            const hash_password = await bcrypt.hash(password, 10);
            const new_user = new user_model({
                email,
                username,
                password: hash_password
            });
            await new_user.save();
            logger.info('User registered successfully', { email, username });
            return true;
        }
        catch (er) {
            logger.error('Error during sign up', { error: er });
            throw er;
        }
    }
}
//# sourceMappingURL=user.auth.service.js.map