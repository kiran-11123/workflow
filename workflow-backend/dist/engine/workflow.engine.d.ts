interface AllExecuteEngines {
    SingupFlowEngine(workflow: any, email: string): Promise<boolean>;
}
export declare class SingupExecuteEngine implements AllExecuteEngines {
    SingupFlowEngine(workflow: any, email: string): Promise<boolean>;
    private executeNode;
}
export {};
//# sourceMappingURL=workflow.engine.d.ts.map