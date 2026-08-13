import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/log.configuration.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const Authentication_middleware = (req, res, next) => {
    logger.info('Entered into the Authentication middleware');
    const token = req.cookies?.token;
    if (!token) {
        logger.warn('Authentication failed: token not found', {
            path: req.path
        });
        return res.status(401).json({
            message: 'Unauthorized: Token not found.'
        });
    }
    if (!JWT_SECRET) {
        logger.error('JWT_SECRET is not defined');
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== 'object' ||
            decoded === null ||
            typeof decoded.email !== 'string' ||
            typeof decoded.user_id !== 'string') {
            logger.warn('Authentication failed: invalid token payload', {
                path: req.path
            });
            return res.status(401).json({
                message: 'Invalid token payload.'
            });
        }
        req.user = decoded;
        logger.info('Authentication successful', {
            userId: decoded.user_id,
            path: req.path
        });
        next();
    }
    catch (error) {
        logger.error('Authentication failed: token verification error', {
            path: req.path,
            error
        });
        return res.status(401).json({
            message: 'Unauthorized: Invalid token.'
        });
    }
};
//# sourceMappingURL=Auth.middleware.js.map