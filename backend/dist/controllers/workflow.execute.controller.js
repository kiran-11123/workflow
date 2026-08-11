import logger from "../utils/logger.setup.js";
//import { ExecuteService } from "../services/workflow.execute.service.js";
//const execute_workflow = new ExecuteService();
export class WorkFlowExecutorController {
    async signup_workflow_execute(req, res) {
        logger.info(`Entered into the signup workflow execute controller`);
        try {
            const { email, idempotent_key, to } = req.body;
            if (!email || !idempotent_key || !to) {
                logger.info(`Fields required for signup flow are missing for email ${email}`);
                return res.status(400).json({
                    message: 'Fields required for signup flow are missing'
                });
            }
            // const result = await execute_workflow.
        }
        catch (er) {
            logger.info(`Error while triggering the signup flow workflow ${er}`);
            return res.status(500).json({
                message: 'Internal server Error'
            });
        }
    }
    async execute(req, res) {
        logger.info(`Entered into the workflow execution controller`);
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            if (!id) {
                logger.info(`Workflow id not found`);
                return res.status(400).json({
                    message: 'workflow id not found'
                });
            }
            // const result = await execute_workflow.execute(id);
            logger.info(`Workflow with ${id} executed successfully `);
            /* return res.status(200).json({
                 message : 'Workflow executed successfully',
                 data : result
             }) */
        }
        catch (er) {
            logger.info(`Got Error while executing the workflow ${er}`);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}
//# sourceMappingURL=workflow.execute.controller.js.map