import { ExecuteEngine } from "../engine/workflow.engine.js";
import workflow_model from "../models/workflow.model.js";
import logger from "../utils/logger.setup.js";
import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
const engine = new ExecuteEngine();
const workflow_repository  = new WorkFlowRespository()


interface AllWorkFlows{
        
      SignupWorkflow(email : string , idempotent_key : string , to : string) : Promise<string>
      
}

export class ExecuteSingupWorkFlow implements AllWorkFlows{
      
     
      async SignupWorkflow(email : string , idempotent_key : string , to : string): Promise<string>{

            logger.info(`Entered into signup workflow execution service for email ${email}`)
            try{

                  const workflow = await workflow_repository.findByWorkFlowName(to);

                  if(!workflow){
                        throw new Error(`Workflow with name ${to} not found`)
                  }
                  
                  //@ts-ignore
                  if(workflow.status !== "ACTIVE"){
                   throw new Error("Only published workflows can be executed");

                  }

                  const result = await engine.execute(workflow);

                  return JSON.stringify(result);


            }
            catch(er){
                  throw er;
            }
           
      }

}