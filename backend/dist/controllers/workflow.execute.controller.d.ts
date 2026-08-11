import type { Request, Response } from "express";
export declare class WorkFlowExecutorController {
    signup_workflow_execute(req: Request, res: Response): Promise<string | Response<any, Record<string, any>>>;
    execute(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=workflow.execute.controller.d.ts.map