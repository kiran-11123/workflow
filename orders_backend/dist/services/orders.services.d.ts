interface Orders {
    CreateOrder(user_id: string, product_id: string, quantity: number): Promise<boolean>;
    CancelOrder(): Promise<boolean>;
    getOrderStatus(): Promise<boolean>;
    updateOrder(): Promise<boolean>;
}
export declare class OrderService implements Orders {
    CreateOrder(user_id: string, product_id: string, quantity: number): Promise<boolean>;
    CancelOrder(): Promise<boolean>;
    getOrderStatus(): Promise<boolean>;
    updateOrder(): Promise<boolean>;
}
export {};
//# sourceMappingURL=orders.services.d.ts.map