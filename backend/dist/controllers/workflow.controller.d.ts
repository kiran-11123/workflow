import type { Request, Response } from 'express';
export declare class WorkFlowController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateWorkflow(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteWorkFlow(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=workflow.controller.d.ts.map