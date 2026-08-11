interface Authentication {
    signinService(email: string, password: string): Promise<string>;
    signupService(email: string, username: string, password: string): Promise<boolean>;
}
export declare class AuthService implements Authentication {
    signinService(email: string, password: string): Promise<string>;
    signupService(email: string, username: string, password: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=user.auth.service.d.ts.map