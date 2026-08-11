import { ExecuteEngine } from "../engine/workflow.engine.js";
import workflow_model from "../models/workflow.model.js";
import logger from "../utils/logger.setup.js";
import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
import workflow_status from "../models/workflow.status.js";
import { error } from "node:console";
const engine = new ExecuteEngine();
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
                idempotent_key: idempotent_key
            });
            await new_status.save();
            const result = await engine.execute(workflow);
            if (result) {
                new_status.status = 'Completed';
            }
            return JSON.stringify(result);
        }
        catch (er) {
            throw er;
        }
    }
}
//# sourceMappingURL=workflow.execute.service.js.map