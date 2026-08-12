import { SingupExecuteEngine } from "../engine/workflow.engine.js";
import logger from "../utils/logger.setup.js";
import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
import workflow_status from "../models/workflow.status.js";
import { WorkflowStatus } from "../types/workflow.types.js";

const engine = new SingupExecuteEngine();
const workflow_repository = new WorkFlowRespository();

interface AllWorkFlows {
    SignupWorkflow(
        email: string,
        idempotent_key: string,
        to: string
    ): Promise<string>;
}

export class ExecuteSingupWorkFlow implements AllWorkFlows {

    async SignupWorkflow(
        email: string,
        idempotent_key: string,
        to: string
    ): Promise<string> {

        logger.info(
            `Entered into signup workflow execution service for email ${email}`
        );

        let new_status: any = null;

        try {

            // 1. Find workflow
            const workflow: any =
                await workflow_repository.findByWorkFlowName(to);

            if (!workflow) {
                throw new Error(
                    `Workflow with name ${to} not found`
                );
            }

            logger.info(
                `Workflow found: ${ (workflow as any).workflow_name }, status: ${workflow.status}`
            );

            // 2. Check workflow status
            if (workflow.status !== WorkflowStatus.ACTIVE) {
                logger.info(`Workflow ${(workflow as any).workflow_name} is not ACTIVE`)
                throw new Error(
                    `Workflow ${(workflow as any).workflow_name} is not ACTIVE`
                );
            }

            // 3. Check idempotency
            const previous_status =
                await workflow_status.findOne({
                    email,
                    idempotent_key
                });

            if (previous_status) {

                logger.info(
                    `Workflow already processed for idempotent key ${idempotent_key}`
                );

                return previous_status.status;
            }

            // 4. Create execution record
            new_status = new workflow_status({
                email,
                workflow_name : to,
                idempotent_key,
                status: "RUNNING"
            });

            await new_status.save();

            logger.info(
                `Workflow execution status set to RUNNING`
            );

            // 5. Execute workflow
            const result =
                await engine.SingupFlowEngine(
                    workflow,
                    email
                );

            // 6. Mark completed

            if(result==true){

               new_status.status = "COMPLETED";
              await new_status.save();

            }
            logger.info(
                `Signup workflow completed successfully for ${email}`
            );

            return JSON.stringify(result);

        } catch (er) {

            logger.error(
                `Error executing signup workflow: ${er}`
            );

            // Only update status if execution record was created
            if (new_status) {

                new_status.status = "FAILED";

                await new_status.save();

                logger.error(
                    `Workflow execution status changed to FAILED for ${email}`
                );
            }

            throw er;
        }
    }
}