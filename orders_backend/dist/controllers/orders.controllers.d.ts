import type { Request, Response } from "express";
export declare class OrderController {
    CreateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    CancelOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    GetOrderStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    UpdateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    GetUserOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=orders.controllers.d.ts.map