import express from 'express'
import { ProductController } from '../controllers/products.controller.js';
const controller = new ProductController();
const product_router = express.Router();
product_router.post('/add' , controller.AddProducts.bind(controller))
product_router.delete('/:id' , controller.DeleteProduct.bind(controller))
product_router.put('/update' , controller.UpdateProduct.bind(controller));





export default product_router;