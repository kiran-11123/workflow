import { WorkFlowService } from "../services/workflow.service.js";
import logger from "../utils/logger.setup.js";
import type {Request,Response} from 'express'

const workflow_serive = new WorkFlowService();


export class WorkFlowController{

     
    async create(req : Request , res: Response){
        logger.info(`New Create workflow is triggered`)
         try{

            const data = req.body;

            if(!data){
                logger.info(`Data not found to create the workflow`)
                return res.status(400).json({
                    message  : "Data is not there to create the workflow"
                })
            }

            const result =  await workflow_serive.createWorkFlow(data);
            
            logger.info(`WorkFlow created successfully`)
            return res.status(201).json({

                message : 'WorkFlow created successfully'
            })

         }
         catch(er){

            logger.info(`Got Error while creating the workflow ${er}`)

            return res.status(500).json({
                message : 'Internal server error'
            })

         }
    }

async findAll(req : Request , res : Response){
         
        try{
            logger.info(`Fetching all workflows is triggered`)

            const result =await workflow_serive.getAllWorkFlow();
            
            logger.info(`All workflows fetched successfully`)
            return res.status(200).json({
                message  : 'Data fetched successfully',
                data : result

            })

        }
        catch(er){
             logger.info(`Getting error while fetching all workflows ${er}`)
             return res.status(500).json({
                message : 'Internal server error'
             })
        }
    }


    async findById(req : Request , res : Response){
        try{
            logger.info(`Fetching workflow by id is triggered`)
            const idParam = req.params.id
            const id = Array.isArray(idParam) ? idParam[0] : idParam

            if(!id){
                 return res.status(400).json({
                    message  : 'workflow id missing'
                 })
            }
            const result = await workflow_serive.getWorkFlowById(id)

            logger.info(`WorkFlow fetched successfully`)
            return res.status(200).json({
                message : 'Workflow fetched successfully',
                data : result
            })

        }
        catch(er){
            logger.info(`Getting error while fetching workflow by id ${er}`)

            return res.status(500).json({

                message : 'Internal server error'
            })
        }
    }


    async updateWorkflow (req  :Request , res : Response){
         
        try{

            logger.info(`Updating workflow by id is triggered`)

            const id :any = req.params.id;
            const data  = req.body;

            if(!id || !data){
                 return res.status(400).json({
                    message : 'Id or Data is missing'
                 })
            }

            const result = await workflow_serive.FindIdAndUpdateWorkFlow(id , data);
            logger.info(`WorkFlow updated successfully`)
            return res.status(200).json({
                 message : 'WorkFlow updated successfully'
            })


        }
        catch(er){
             logger.info(`Getting error while updating workflow by id ${er}`)

            return res.status(500).json({

                message : 'Internal server error'
            })
        }
    }

    async deleteWorkFlow(req : Request , res : Response){
          
        try{

            logger.info(`Delete workflow  by id is triggered`)

            const id : any = req.params.id;
            
            if(!id){
                return res.status(400).json({
                    message  : 'Id is missing'
                })
            }

            const result = await workflow_serive.FindIdAndDeleteWorkFlow(id);

            logger.info(`WorkFlow deleted successfully`)
            return res.status(200).json({
                message  : 'WorkFlow deleted successfully',

            })
            

        }
        catch(er){

            logger.info(`Getting error while updating workflow by id ${er}`)
            return res.status(500).json({
                message : 'Internal server error'
            })
             
        }
    } 
     
}