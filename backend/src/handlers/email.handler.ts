
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import logger from '../utils/logger.setup.js';
dotenv.config()


interface EmailOptions{
     to : string,
     subject : string,
     text?:string,
     html? :string

}

const GMAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user: "eventnest.official.main@gmail.com", 
         pass: GMAIL_PASSWORD,      
  },
   tls: {
    rejectUnauthorized: false,       
  },
})

export class EmailHandler{
       
    private static instance : EmailHandler

    private constructor(){}

    static getInstance():EmailHandler{
          
        if(!EmailHandler.instance){
            EmailHandler.instance = new EmailHandler();
        }
        
        return  EmailHandler.instance;
    }


    async sendEmail(options : EmailOptions): Promise<boolean> {
         await transporter.sendMail({
            from: "eventnest.official.main@gmail.com",
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        });

        return true;
    }
}


