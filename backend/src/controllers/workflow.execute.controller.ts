import type { Request , Response } from "express";
import logger from "../utils/logger.setup.js";
import { ExecuteService } from "../services/workflow.execute.service.js";


const execute_workflow = new ExecuteService();
export class WorkFlowExecutorController{
      

    async execute(req : Request  ,res : Response){
        
        logger.info(`Entered into the workflow execution controller`)
        try{

            const id : any = req.params.id;
            
            if(!id){
                logger.info(`Workflow id not found`)
                return res.status(400).json({
                    message : 'workflow id not found'
                })
            }

            const result = await execute_workflow.execute(id);
            
            logger.info(`Workflow with ${id} executed successfully `)
            return res.status(200).json({
                message : 'Workflow executed successfully'
            })

        }
        catch(er){
             
            logger.info(`Got Error while executing the workflow ${er}`);
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
         
    }

}