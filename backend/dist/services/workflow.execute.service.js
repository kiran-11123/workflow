import { SingupExecuteEngine } from "../engine/workflow.engine.js";
import workflow_model from "../models/workflow.model.js";
import logger from "../utils/logger.setup.js";
import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
import workflow_status from "../models/workflow.status.js";
const engine = new SingupExecuteEngine();
const workflow_repository = new WorkFlowRespository();
export class ExecuteSingupWorkFlow {
    async SignupWorkflow(email, idempotent_key, to) {
        logger.info(`Entered into signup workflow execution service for email ${email}`);
        try {
            const workflow = await workflow_repository.findByWorkFlowName(to);
            if (!workflow) {
                throw new Error(`Workflow with name ${to} not found`);
            }
            //@ts-ignore
            if (workflow.status !== "ACTIVE") {
                throw new Error("Only published workflows can be executed");
            }
            const prev_status = await workflow_status.findOne({ email: email, idempotent_key: idempotent_key });
            if (prev_status && prev_status.length > 0) {
                return prev_status[0].status;
            }
            const new_status = new workflow_status({
                email: email,
                idempotent_key: idempotent_key,
                status: 'RUNNING'
            });
            await new_status.save();
            try {
                const result = await engine.SingupFlowEngine(workflow, email);
                if (result) {
                    new_status.status = 'Completed';
                }
                await new_status.save();
                return JSON.stringify(result);
            }
            catch (er) {
                new_status.status = 'FAILED';
                await new_status.save();
                logger.error(`Signup workflow failed for ${email}: ${er}`);
                throw er;
            }
        }
        catch (er) {
            logger.error(`Error executing signup workflow: ${er}`);
            throw er;
        }
    }
}
//# sourceMappingURL=workflow.execute.service.js.map