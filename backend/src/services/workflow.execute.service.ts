import { ExecuteEngine } from "../engine/workflow.engine.js";
import workflow_model from "../models/workflow.model.js";
import logger from "../utils/logger.setup.js";
import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
const engine = new ExecuteEngine();
const workflow_repository  = new WorkFlowRespository()

export class ExecuteService{

      async execute(id : string){
            logger.info(`Entered into workflow execution service for id ${id}`)
            try{

                  const workflow = await workflow_repository.findById(id);

                  if(!workflow){
                        throw new Error(`Workflow with id ${id} not found`)
                  }

                  if(workflow.status !== "ACTIVE"){
                   throw new Error("Only published workflows can be executed");

                  }

                  const result = await engine.execute(workflow);

                  return result;


            }
            catch(er){
                  throw er;
            }
           
      }

}