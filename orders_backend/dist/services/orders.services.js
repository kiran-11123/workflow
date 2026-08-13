import mongoose from "mongoose";
import { orders_model } from "../models/orders.model.js";
import { inventory_model } from "../models/inventroy.model.js";
import { product_model } from "../models/products.model.js";
import logger from "../utils/log.configuration.js";
import { OrderStatus } from "../models/orders.model.js";
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
                // Important: Only update if enough stock exists
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
            // 3. Create Order
            const order = new orders_model({
                userId: user_id,
                productId: productId,
                quantity: quantity,
                status: OrderStatus.PROCESSING,
                totalAmount: totalAmount,
                currency: product.currency,
                PaymentMode: 'PENDING'
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
    async CancelOrder(user_id, order_id) {
        logger.info(`Entered into Cancel Order service for user ${user_id} and order ${order_id}`);
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const orderId = new mongoose.Types.ObjectId(order_id);
            const check_order = await orders_model.findOne({
                _id: orderId,
                userId: user_id
            }).session(session);
            if (!check_order) {
                throw new Error('Order Not found');
            }
            // Check if order can be cancelled
            if (check_order.status !== OrderStatus.PROCESSING && check_order.status !== OrderStatus.CONFIRMED) {
                throw new Error(`We cannot cancel the order since the order is on the way`);
            }
            // Update order status to cancelled
            check_order.status = OrderStatus.CANCELLED;
            await check_order.save({ session });
            // Restore inventory
            await inventory_model.findOneAndUpdate({
                productId: check_order.productId
            }, {
                $inc: {
                    availableStock: check_order.quantity
                }
            }, { session });
            await session.commitTransaction();
            logger.info(`Order ${order_id} cancelled successfully for user ${user_id}`);
            return true;
        }
        catch (er) {
            await session.abortTransaction();
            logger.error(`Error cancelling order: ${er}`);
            throw er;
        }
        finally {
            await session.endSession();
        }
    }
    async getOrderStatus(user_id, order_id) {
        logger.info(`Entered into getOrderStatus service for user ${user_id} and order ${order_id}`);
        try {
            const orderId = new mongoose.Types.ObjectId(order_id);
            const order = await orders_model.findOne({
                _id: orderId,
                userId: user_id
            }).populate('productId', 'name price');
            if (!order) {
                throw new Error('Order not found');
            }
            logger.info(`Order status retrieved: ${order.status}`);
            return {
                orderId: order._id,
                userId: order.userId,
                status: order.status,
                totalAmount: order.totalAmount,
                currency: order.currency,
                quantity: order.quantity,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            };
        }
        catch (er) {
            logger.error(`Error retrieving order status: ${er}`);
            throw er;
        }
    }
    async updateOrder(user_id, order_id, status) {
        logger.info(`Entered into updateOrder service for order ${order_id}`);
        try {
            // Validate status
            const validStatuses = Object.values(OrderStatus);
            if (!validStatuses.includes(status)) {
                throw new Error('Invalid status');
            }
            const orderId = new mongoose.Types.ObjectId(order_id);
            const updatedOrder = await orders_model.findOneAndUpdate({
                _id: orderId,
                userId: user_id
            }, {
                $set: {
                    status: status
                }
            }, {
                new: true
            });
            if (!updatedOrder) {
                throw new Error('Order not found');
            }
            logger.info(`Order ${order_id} updated to status: ${status}`);
            return true;
        }
        catch (er) {
            logger.error(`Error updating order: ${er}`);
            throw er;
        }
    }
    async getUserOrders(user_id) {
        logger.info(`Entered into getUserOrders service for user ${user_id}`);
        try {
            const orders = await orders_model.find({
                userId: user_id
            })
                .populate('productId', 'name price description')
                .sort({ createdAt: -1 });
            logger.info(`Retrieved ${orders.length} orders for user ${user_id}`);
            return orders.map(order => ({
                orderId: order._id,
                productId: order.productId,
                quantity: order.quantity,
                status: order.status,
                totalAmount: order.totalAmount,
                currency: order.currency,
                PaymentMode: order.PaymentMode,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }));
        }
        catch (er) {
            logger.error(`Error retrieving user orders: ${er}`);
            throw er;
        }
    }
}
//# sourceMappingURL=orders.services.js.map