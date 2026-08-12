interface AllWorkFlows {
    SignupWorkflow(email: string, idempotent_key: string, to: string): Promise<string>;
}
export declare class ExecuteSingupWorkFlow implements AllWorkFlows {
    SignupWorkflow(email: string, idempotent_key: string, to: string): Promise<string>;
}
export {};
//# sourceMappingURL=workflow.execute.service.d.ts.map