import workflow_producer from "./workflow.producer.js";
import logger from "../utils/logger.setup.js";
export async function sendToDLQ(originalMessage, error) {
    logger.info(`Entered into dlq function`);
    try {
        await workflow_producer.send({
            topic: 'workflow-dlq',
            messages: [
                {
                    key: originalMessage.key?.toString() || undefined,
                    value: JSON.stringify({
                        originalMessage: JSON.parse(originalMessage.value?.toString() || "{}"),
                        error: {
                            message: error?.message,
                            status: error?.status,
                            response: error?.response
                        },
                        failed_at: new Date().toISOString()
                    })
                }
            ]
        });
        logger.info(`Message added into dlq`);
    }
    catch (er) {
        logger.info(`Failed to send message to dql ${er}`);
        throw er;
    }
}
//# sourceMappingURL=workflow_dlq.js.map