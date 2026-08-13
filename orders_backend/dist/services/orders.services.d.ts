interface Orders {
    CreateOrder(): Promise<boolean>;
    CancelOrder(): Promise<boolean>;
    getOrderStatus(): Promise<boolean>;
    updateOrder(): Promise<boolean>;
}
export declare class OrderService implements Orders {
    CreateOrder(): Promise<boolean>;
    CancelOrder(): Promise<boolean>;
    getOrderStatus(): Promise<boolean>;
    updateOrder(): Promise<boolean>;
}
export {};
//# sourceMappingURL=orders.services.d.ts.map