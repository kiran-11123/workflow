import { product_model } from "../models/products.model.js";
import { orders_model } from "../models/orders.model.js";
export class ProductService {
    async AddProduct() {
        try {
            return true;
        }
        catch (er) {
            throw er;
        }
    }
    async DeleteProduct() {
        try {
            return false;
        }
        catch (er) {
            throw er;
        }
    }
    async UpdateProduct() {
        try {
            return false;
        }
        catch (er) {
            throw er;
        }
    }
}
//# sourceMappingURL=products.service.js.map