import type { Request , Response } from "express";
import logger from "../utils/logger.setup.js";
import { ExecuteSingupWorkFlow } from "../services/workflow.execute.service.js";

const execute_workflow = new ExecuteSingupWorkFlow();
export class WorkFlowExecutorController{



    async signup_workflow_execute(req :Request , res : Response){
            logger.info(`Entered into the signup workflow execute controller`)
             try{
    
                const {email , idempotent_key , workflow_name} = req.body;

                console.log(email , idempotent_key , workflow_name)

                if(!email || !idempotent_key || !workflow_name){
                    logger.info(`Fields required for signup flow are missing for email ${email}`)
                    return res.status(400).json({
                        message : 'Fields required for signup flow are missing'
                    })
                }

                const result = await execute_workflow.SignupWorkflow(email , idempotent_key, workflow_name);
                logger.info(`Singup Workflow for email ${email} executed successfully `)
                
                return res.status(200).json({
                    message  :`Singup Workflow executed successfully for email ${email}`
                })
              
                
    
             }
             catch(er){
                logger.info(`Error while triggering the signup flow workflow ${er}`)

                  return res.status(500).json({
                     message : 'Internal server Error'
                  })
                 
             }
        }
         
      

   
         
    

}