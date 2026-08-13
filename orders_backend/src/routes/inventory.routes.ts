import express from 'express'
import { InventoryController } from '../controllers/inventory.controllers.js';

const inventory_router = express.Router();
const controller = new InventoryController();

// Update inventory stock for a product
inventory_router.put('/:id', controller.UpdateInventory.bind(controller));

export default inventory_router;
