interface Inventory {
    UpdateInventory(product_id: string, stock: number): Promise<boolean>;
}
export declare class InventoryService implements Inventory {
    UpdateInventory(product_id: string, stock: number): Promise<boolean>;
}
export {};
//# sourceMappingURL=inventory.services.d.ts.map