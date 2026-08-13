import express from 'express'
import { OrderController } from '../controllers/orders.controllers.js';

const orders_router = express.Router();
const controller = new OrderController();

// Create a new order
orders_router.post('/create', controller.CreateOrder.bind(controller));

// Cancel an order
orders_router.post('/cancel', controller.CancelOrder.bind(controller));

// Get order status
orders_router.get('/status', controller.GetOrderStatus.bind(controller));

// Update order status
orders_router.put('/update', controller.UpdateOrder.bind(controller));

// Get all orders for a user
orders_router.get('/user/:user_id', controller.GetUserOrders.bind(controller));

export default orders_router;