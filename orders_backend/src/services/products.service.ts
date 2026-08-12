import { product_model } from "../models/products.model.js";
import { orders_model } from "../models/orders.model.js";

export interface IProductService{
      AddProduct():Promise<boolean>
      DeleteProduct():Promise<boolean>
      UpdateProduct():Promise<boolean>
     
}


export class ProductService implements IProductService{
        
    async AddProduct(): Promise<boolean>{
         try{
             
            return true;
         }
         catch(er){
             throw er;
         }
    }

    async DeleteProduct(): Promise<boolean> {
        
        try{

            return false;

        }
        catch(er){
             throw er;
        }
    }

    async UpdateProduct(): Promise<boolean> {
       
        try{
            return false;
        }
        catch(er){
             throw er;
        }
    }

  
    
}