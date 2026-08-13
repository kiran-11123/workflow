import mongoose from "mongoose";
import { orders_model } from "../models/orders.model.js";
import { inventory_model } from "../models/inventroy.model.js";
import { product_model } from "../models/products.model.js";
import logger from "../utils/log.configuration.js";
export class OrderService {
    async CreateOrder(user_id, product_id, quantity) {
        logger.info(`Entered into createOrder service for user ${user_id} and product ${product_id}`);
        const session = await mongoose.startSession();
        try {
            if (quantity <= 0) {
                throw new Error('Quantity must be greater than zero');
            }
            const productId = new mongoose.Types.ObjectId(product_id);
            session.startTransaction();
            // 1. Get product
            const product = await product_model.findById(productId).session(session);
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.status !== 'ACTIVE') {
                throw new Error('Product is not available');
            }
            // 2. Atomically reserve/decrease inventory
            const inventory = await inventory_model.findOneAndUpdate({
                productId: productId,
                // Important:
                // Only update if enough stock exists
                availableStock: {
                    $gte: quantity
                }
            }, {
                $inc: {
                    availableStock: -quantity,
                }
            }, {
                new: true,
                session
            });
            if (!inventory) {
                throw new Error('Insufficient stock');
            }
            const totalAmount = product.price * quantity;
            // 4. Create Order
            const order = new orders_model({
                userId: user_id,
                status: 'PROCESSING',
                totalAmount: totalAmount,
                currency: product.currency
            });
            await order.save({ session });
            await session.commitTransaction();
            logger.info(`Order ${order._id} created successfully for user ${user_id}`);
            return true;
        }
        catch (er) {
            await session.abortTransaction();
            logger.error(`Create order failed for user ${user_id}`, {
                error: er
            });
            throw er;
        }
        finally {
            await session.endSession();
        }
    }
    async CancelOrder() {
        try {
            return true;
        }
        catch (er) {
            throw er;
        }
    }
    async getOrderStatus() {
        try {
            return true;
        }
        catch (er) {
            throw er;
        }
    }
    async updateOrder() {
        try {
            return true;
        }
        catch (er) {
            throw er;
        }
    }
}
//# sourceMappingURL=orders.services.js.map