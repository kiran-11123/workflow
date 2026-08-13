import express from 'express';
import { Authentication_middleware } from '../middlewares/Auth.middleware.js';
import { OrderController } from '../controllers/orders.controllers.js';
const orders_router = express.Router();
const controller = new OrderController();
// Create a new order
orders_router.post('/create', Authentication_middleware, controller.CreateOrder.bind(controller));
// Cancel an order
orders_router.post('/cancel', Authentication_middleware, controller.CancelOrder.bind(controller));
// Get order status
orders_router.get('/status', Authentication_middleware, controller.GetOrderStatus.bind(controller));
// Update order status
orders_router.put('/update', Authentication_middleware, controller.UpdateOrder.bind(controller));
// Get all orders for a user
orders_router.get('/user', Authentication_middleware, controller.GetUserOrders.bind(controller));
export default orders_router;
//# sourceMappingURL=orders.routes.js.map