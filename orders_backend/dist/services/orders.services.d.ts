interface Orders {
    CreateOrder(user_id: string, product_id: string, quantity: number): Promise<boolean>;
    CancelOrder(user_id: string, order_id: string): Promise<boolean>;
    getOrderStatus(user_id: string, order_id: string): Promise<any>;
    updateOrder(user_id: string, order_id: string, status: string): Promise<boolean>;
    getUserOrders(user_id: string): Promise<any[]>;
}
export declare class OrderService implements Orders {
    CreateOrder(user_id: string, product_id: string, quantity: number): Promise<boolean>;
    CancelOrder(user_id: string, order_id: string): Promise<boolean>;
    getOrderStatus(user_id: string, order_id: string): Promise<any>;
    updateOrder(user_id: string, order_id: string, status: string): Promise<boolean>;
    getUserOrders(user_id: string): Promise<any[]>;
}
export {};
//# sourceMappingURL=orders.services.d.ts.map