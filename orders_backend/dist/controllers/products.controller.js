import { ProductService } from "../services/products.service.js";
import logger from "../utils/log.configuration.js";
const products_service = new ProductService();
export class ProductController {
    async AddProducts(req, res) {
        logger.info(`Entered into Add Product Controller`);
        try {
            const { name, description, price, currency } = req.body;
            if (!name || !description || !price || !currency) {
                logger.info(`All Fields required to add the product`);
                return res.status(400).json({
                    message: 'All Fields required to add the product'
                });
            }
            const result = await products_service.AddProduct(name, description, price, currency);
            return res.status(200).json({
                message: `Product with name : ${name} Added successfully`
            });
        }
        catch (er) {
            logger.error(`Error while adding the product ${er}`);
            if (er.message === 'Product Exists') {
                logger.error('Product Exists');
                return res.status(400).json({
                    message: 'Product Exists'
                });
            }
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
    async DeleteProduct(req, res) {
        logger.info(`Entered into Delete Product controller`);
        try {
            const product_id = req.params;
            if (!product_id) {
                logger.error(`Product id is missing`);
                return res.status(400).json({
                    message: `Product Id not found`
                });
            }
            logger.info(`Product with Id ${product_id} deleted successfully`);
            return res.status(200).json({
                message: `Product Deleted successfully`
            });
        }
        catch (er) {
            logger.error(`Error while deleting the product : ${er}`);
            if (er.message === 'Product not found') {
                return res.status(400).json({
                    message: 'Product not found'
                });
            }
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}
//# sourceMappingURL=products.controller.js.map