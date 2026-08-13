import mongoose from "mongoose";
import { orders_model } from "../models/orders.model.js";
import { inventory_model } from "../models/inventroy.model.js";

interface Orders{
      CreateOrder() : Promise<boolean>;
      CancelOrder() : Promise<boolean>
      getOrderStatus() : Promise<boolean>
      updateOrder() : Promise<boolean>
}


export class OrderService implements Orders {
        
      async CreateOrder() : Promise<boolean>{

        try{

            return true;

        }
        catch(er){
            throw er;
        }
         
      }
      async CancelOrder() : Promise<boolean>{

        try{
            
            return true;
        }
        catch(er){
            throw er;
        }

      }
      async getOrderStatus():  Promise<boolean>{

        
        try{
            
            return true;
        }
        catch(er){
            throw er;
        }
         
      }
      async updateOrder() :  Promise<boolean>{

        
        try{
            
            return true;
        }
        catch(er){
            throw er;
        }
         
      }
}