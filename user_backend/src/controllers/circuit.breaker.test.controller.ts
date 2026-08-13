import type { Request , Response } from "express";
import { WorkflowBreaker } from "../breakers/workflow.breaker.js";
import logger from "../utils/logger.setup.js";
export const CircuitBreakerController= async(req : Request , res : Response)=>{
    logger.info(`Entered into circuit breaker testing controller`)
    try{

        const result = await WorkflowBreaker.fire();
        logger.info(`Testing using circuit breaker`)
        return res.status(200).json({
            message :'Workflow service is healthy'
        })

        

    }
    catch(er){
         return res.status(500).json({
            message : 'Internal server error'
         })
    }
}