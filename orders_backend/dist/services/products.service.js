import { product_model } from "../models/products.model.js";
import { orders_model } from "../models/orders.model.js";
import logger from "../utils/log.configuration.js";
import mongoose from "mongoose";
export class ProductService {
    async AddProduct(name, description, price, currency) {
        logger.info(`Entered into the AddProduct service for product : ${name}`);
        try {
            const find_product = await product_model.findOne({ name: name });
            if (find_product) {
                logger.info(`Product with name ${name} is already exists in the table`);
                throw new Error('Product Exists');
            }
            const new_product = new product_model({
                name: name,
                description: description,
                price: Number(price),
                currency: currency
            });
            await new_product.save();
            logger.info(`Product : ${name} is added to the table`);
            return true;
        }
        catch (er) {
            throw er;
        }
    }
    async DeleteProduct(product_id) {
        try {
            const product = await product_model.findByIdAndDelete(product_id);
            if (!product) {
                throw new Error('Product not found');
            }
            return true;
        }
        catch (er) {
            throw er;
        }
    }
    async UpdateProduct(product_id, price, status) {
        try {
            const productId = new mongoose.Types.ObjectId(product_id);
            const updateData = {};
            if (price !== undefined) {
                updateData.price = Number(price);
            }
            if (status !== undefined) {
                updateData.status = status;
            }
            const product = await product_model.findByIdAndUpdate(productId, {
                $set: updateData
            }, {
                new: true
            });
            if (!product) {
                return false;
            }
            return true;
        }
        catch (er) {
            throw er;
        }
    }
}
//# sourceMappingURL=products.service.js.map