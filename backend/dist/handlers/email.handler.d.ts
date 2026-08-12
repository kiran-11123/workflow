interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare class EmailHandler {
    private static instance;
    private constructor();
    static getInstance(): EmailHandler;
    sendEmail(options: EmailOptions): Promise<boolean>;
}
export {};
//# sourceMappingURL=email.handler.d.ts.map