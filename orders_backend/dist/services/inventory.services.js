import { inventory_model } from "../models/inventroy.model.js";
import mongoose from "mongoose";
import logger from "../utils/log.configuration.js";
export class InventoryService {
    async UpdateInventory(product_id, stock) {
        logger.info(`Entered into update inventory for product ${product_id}`);
        try {
            const product_id_new = new mongoose.Types.ObjectId(product_id);
            const update_inventory = await inventory_model.findOneAndUpdate({
                productId: product_id_new
            }, {
                $inc: {
                    availableStock: stock
                }
            }, {
                new: true,
                upsert: true
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