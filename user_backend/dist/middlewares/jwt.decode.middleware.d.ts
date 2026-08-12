import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
interface UserPayload extends JwtPayload {
    email: string;
    user_id: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
export declare const Authentication_middleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=jwt.decode.middleware.d.ts.map