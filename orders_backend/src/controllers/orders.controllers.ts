import { OrderService } from "../services/orders.services.js";
import type { Request, Response } from "express";
import logger from "../utils/log.configuration.js";

const order_service = new OrderService();

export class OrderController {
    
    async CreateOrder(req: Request, res: Response) {
        logger.info('Entered into Create Order Controller');
        try {
            const { user_id, product_id, quantity } = req.body;

            // Validate required fields
            if (!user_id || !product_id || !quantity) {
                logger.info('Required fields missing for order creation');
                return res.status(400).json({
                    message: 'Required fields: user_id, product_id, quantity'
                });
            }

            // Validate quantity is a positive number
            if (typeof quantity !== 'number' || quantity <= 0) {
                logger.info('Invalid quantity provided');
                return res.status(400).json({
                    message: 'Quantity must be a positive number'
                });
            }

            const result = await order_service.CreateOrder(user_id, product_id, quantity);
            
            logger.info(`Order created successfully for user ${user_id}`);
            return res.status(201).json({
                message: 'Order created successfully',
                success: true
            });

        } catch (er: any) {
            logger.error(`Error while creating order: ${er.message}`);
            
            if (er.message === 'Product not found') {
                return res.status(404).json({
                    message: 'Product not found'
                });
            } else if (er.message === 'Product is not available') {
                return res.status(400).json({
                    message: 'Product is not available'
                });
            } else if (er.message === 'Insufficient stock') {
                return res.status(400).json({
                    message: 'Insufficient stock available'
                });
            } else if (er.message === 'Quantity must be greater than zero') {
                return res.status(400).json({
                    message: 'Quantity must be greater than zero'
                });
            }

            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    async CancelOrder(req: Request, res: Response) {
        logger.info('Entered into Cancel Order Controller');
        try {
            const { user_id, order_id } = req.body;

            if (!user_id || !order_id) {
                logger.info('Required fields missing for order cancellation');
                return res.status(400).json({
                    message: 'Required fields: user_id, order_id'
                });
            }

            const result = await order_service.CancelOrder(user_id, order_id);

            logger.info(`Order ${order_id} cancelled successfully`);
            return res.status(200).json({
                message: 'Order cancelled successfully',
                success: true
            });

        } catch (er: any) {
            logger.error(`Error while cancelling order: ${er.message}`);

            if (er.message === 'Order Not found') {
                return res.status(404).json({
                    message: 'Order not found'
                });
            } else if (er.message.includes('cannot cancel')) {
                return res.status(400).json({
                    message: er.message
                });
            }

            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    async GetOrderStatus(req: Request, res: Response) {
        logger.info('Entered into Get Order Status Controller');
        try {
            const { user_id, order_id } = req.query;

            if (!user_id || !order_id) {
                logger.info('Required query parameters missing');
                return res.status(400).json({
                    message: 'Required query parameters: user_id, order_id'
                });
            }

            const result = await order_service.getOrderStatus(
                user_id as string,
                order_id as string
            );

            logger.info(`Order status retrieved for order ${order_id}`);
            return res.status(200).json({
                message: 'Order status retrieved successfully',
                data: result,
                success: true
            });

        } catch (er: any) {
            logger.error(`Error while retrieving order status: ${er.message}`);

            if (er.message === 'Order not found') {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }

            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    async UpdateOrder(req: Request, res: Response) {
        logger.info('Entered into Update Order Controller');
        try {
            const { user_id, order_id, status } = req.body;

            if (!user_id || !order_id || !status) {
                logger.info('Required fields missing for order update');
                return res.status(400).json({
                    message: 'Required fields: user_id, order_id, status'
                });
            }

            const result = await order_service.updateOrder(
                user_id,
                order_id,
                status
            );

            logger.info(`Order ${order_id} updated successfully`);
            return res.status(200).json({
                message: 'Order updated successfully',
                success: true
            });

        } catch (er: any) {
            logger.error(`Error while updating order: ${er.message}`);

            if (er.message === 'Order not found') {
                return res.status(404).json({
                    message: 'Order not found'
                });
            } else if (er.message === 'Invalid status') {
                return res.status(400).json({
                    message: 'Invalid order status'
                });
            }

            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    async GetUserOrders(req: Request, res: Response) {
        logger.info('Entered into Get User Orders Controller');
        try {
            const { user_id } = req.params;

            const userId = Array.isArray(user_id) ? user_id[0] : user_id;


            if (!userId) {
                logger.info('User ID missing in request');
                return res.status(400).json({
                    message: 'User ID is required'
                });
            }

            const result = await order_service.getUserOrders(userId);

            logger.info(`Orders retrieved for user ${user_id}`);
            return res.status(200).json({
                message: 'Orders retrieved successfully',
                data: result,
                success: true
            });

        } catch (er: any) {
            logger.error(`Error while retrieving user orders: ${er.message}`);

            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}
