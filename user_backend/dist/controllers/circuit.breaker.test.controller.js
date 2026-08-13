import { WorkflowBreaker } from "../breakers/workflow.breaker.js";
import logger from "../utils/logger.setup.js";
export const CircuitBreakerController = async (req, res) => {
    logger.info(`Entered into circuit breaker testing controller`);
    try {
        const result = await WorkflowBreaker.fire();
        logger.info(`Testing using circuit breaker`);
        return res.status(200).json({
            message: 'Workflow service is healthy'
        });
    }
    catch (er) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
//# sourceMappingURL=circuit.breaker.test.controller.js.map