import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.setup.js';
dotenv.config();
const GMAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "eventnest.official.main@gmail.com",
        pass: GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
export class EmailHandler {
    async sendEmailSignup(email) {
        logger.info(`Entered into mail handler for email ${email}`);
        try {
            let mailoptions = {
                from: "eventnest.official.main@gmail.com",
                to: email,
                subject: "Status Check",
                text: "Hello , How are you",
                html: `
               
           <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
      
      <h1 style="color: #4CAF50; text-align: center;margin-bottom:20px;">
        Enter this code to reset your password
      </h1>

      <div style="text-align:center;">
        <div style="
          display: inline-block;
          padding: 12px 25px;
          background-color: #ffffff;
          border: 2px dashed #4CAF50;
          border-radius: 8px;
          font-size: 22px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #333;">
          Good Luck !!
        </div>
      </div>

      <p style="color:#555; text-align:center; margin-top:25px; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>

    </div>
            `
            };
            await transporter.sendMail(mailoptions);
            logger.info(`Email sent successfully ${email}`);
            return true;
        }
        catch (er) {
            logger.info(`Error in email handler ${email}`);
            throw er;
        }
    }
}
//# sourceMappingURL=email.handler.js.map