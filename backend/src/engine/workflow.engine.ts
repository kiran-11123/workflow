import logger from "../utils/logger.setup.js";
import { type INode , type IEdge, WorkflowStatus } from "../types/workflow.types.js";
export class ExecuteEngine{
       
     async execute(workflow : any){
        logger.info(`Workflow engine started for workflow ${workflow.workflow_name}`)
        try{
           
            const nodes : INode[] = workflow.nodes;
            const edges : IEdge[] = workflow.edges;

            const startNode = nodes.find(
                node=>node.type==='START'
            )

              if (!startNode) {
                throw new Error("START node not found");
            }

            logger.info(
                `Starting workflow from node ${startNode.id}`
            );


            let CurrentNode : INode = startNode;

            while(CurrentNode.type !== "END"){

                logger.info(`Executing node ${CurrentNode.id} of type ${CurrentNode.type}`)

                const NextEdge = edges.find(
                    edge => edge.source===CurrentNode.id
                )

                if(!NextEdge){
                    throw new Error(
                        `No outgoing edge found for node ${CurrentNode.id}`
                    );
                }

                 const nextNode = nodes.find(
                    node => node.id === NextEdge.target
                );

                 if (!nextNode) {
                    throw new Error(
                        `Target node ${NextEdge.target} not found`
                    );
                }

                CurrentNode = nextNode
                    
            }

            logger.info(
                `Workflow ${workflow.workflow_name} reached END node`
            );

            return {
                status: "COMPLETED"
            };

              

        }
        catch(er){
            logger.info(`Error while executing the workflow ${er}`)
            throw er;
        }
          
     }
}