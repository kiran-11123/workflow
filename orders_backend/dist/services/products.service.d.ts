export interface IProductService {
    AddProduct(name: string, description: string, price: number, currency: string): Promise<boolean>;
    DeleteProduct(product_id: string): Promise<boolean>;
    UpdateProduct(product_id: string, price?: number, status?: string): Promise<boolean>;
}
export declare class ProductService implements IProductService {
    AddProduct(name: string, description: string, price: number, currency: string): Promise<boolean>;
    DeleteProduct(product_id: string): Promise<boolean>;
    UpdateProduct(product_id: string, price?: number, status?: string): Promise<boolean>;
}
//# sourceMappingURL=products.service.d.ts.map