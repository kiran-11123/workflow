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
    static instance;
    constructor() { }
    static getInstance() {
        if (!EmailHandler.instance) {
            EmailHandler.instance = new EmailHandler();
        }
        return EmailHandler.instance;
    }
    async sendEmail(options) {
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
//# sourceMappingURL=email.handler.js.map