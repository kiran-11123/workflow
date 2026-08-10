import type { Request , Response } from "express";
import logger from "../utils/logger.setup.js";
import { AuthService } from "../services/user.auth.service.js";

const auth_service = new AuthService();
export class AuthController{
      
    async SigninController(req :Request , res : Response){
        
        logger.info(`Entered into the SigninController`)
        try{
            
            const {email , password}  =req.body;

            if(!email || !password){
                logger.info(`Required email and password`)
                 return res.status(400).json({
                    
                     message  :'Required Email and Password'
                 })
            }

            const token  = await auth_service.SiginService(email , password);

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
        catch(er :any){

            logger.info(`Error while user signin ${er}`)
            if(er.message === 'The user not registered'){
                return res.status(404).json({
                    message : 'The user not registered'
                })
            }
            else if(er.message === 'Invalid Credentials'){
                 return res.status(400).json({
                    message : 'Invalid Credentials'
                 })
            }
            else if(er.message === 'JWT_SECRET is missing'){
                 return res.status(401).json({
                    message  : 'JWT_SECRET is missing'
                 })
            }

            return res.status(500).json({
                message : 'Internal server error'
            })
             
        }
         
    }

    async SignupController(req :Request , res : Response){
             logger.info('Sign up request received', { email: req.body.email, username: req.body.username });

    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        if (!email || !username || !password) {
            logger.warn('Sign up failed: missing required fields');
            return res.status(400).json({
                message: 'All Fields Required'
            });
        }

        const token = await auth_service.SignUpService(email, username, password);
        logger.info('User registered successfully', { email, username });

        return res.status(201).json({
            message: 'User Registered Successfully',
            token: token
        });
    } catch (er: any) {
        if (er.message === 'User Already Registered') {
            logger.warn('Sign up failed: user already registered', { email: req.body.email });
            return res.status(400).json({
                message: 'User Already Registered'
            });
        } else if (er.message === 'Username Already Taken') {
            logger.warn('Sign up failed: username already taken', { username: req.body.username });
            return res.status(400).json({
                message: 'Username Already Taken'
            });
        }

        logger.error('Sign up error', { error: er.message, stack: er.stack });
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}
}