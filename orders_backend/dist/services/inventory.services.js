import { inventory_model } from "../models/inventroy.model.js";
import mongoose from "mongoose";
export class InventoryService {
    async UpdateInventory(product_id, stock) {
        try {
            const product_id_new = new mongoose.Types.ObjectId(product_id);
            const update_inventory = await inventory_model.findOneAndUpdate({
                productId: product_id_new
            }, {
                $inc: {
                    availableStock: stock
                }
            }, {
                new: true
            });
            if (!update_inventory) {
                throw new Error('Inventory not found for this product');
            }
            return true;
        }
        catch (er) {
            throw er;
        }
    }
}
//# sourceMappingURL=inventory.services.js.map