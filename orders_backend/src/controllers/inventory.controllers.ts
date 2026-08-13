import { InventoryService } from "../services/inventory.services.js";
import type { Request , Response } from "express";
import logger from "../utils/log.configuration.js";
import { log } from "node:console";
const inventory_service = new InventoryService();


export class InventoryController{
    
    async UpdateInventory(req : Request , res:Response ) {
        logger.info(`Entered into Update Inventory Controller`)
        try{
            
            const product_id = Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            if(!product_id){
                logger.info(`Product Id is missing`)
                return res.status(400).json({
                    message  : 'Product Id is missing '
                })
            }
            const stock = req.body.stock;
            if(!stock){
                logger.info(`Stock to be updated is not found`)
                return res.status(400).json({
                    message : "Stock Update is missing"
                })
            }
            

            const result = await inventory_service.UpdateInventory(product_id ,stock);
            logger.info(`Inventory for Product : ${product_id} is updated successfully`)
            return res.status(200).json({
                message  :'Inventory Updated successfully'
            })

        }
        catch(er){

            logger.error(`Error while updating the inventory for the product : ${er}`)
            return res.status(500).json({
                message  : 'Internal Server Error'
            })
             
        }
    }
}