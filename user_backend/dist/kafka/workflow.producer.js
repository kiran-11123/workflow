import kafka from "./kafka.connection.js";
import logger from "../utils/logger.setup.js";
const workflow_producer = kafka.producer();
export async function ConnectProducer() {
    await workflow_producer.connect();
    logger.info(`Kafka Workflow producer is connected`);
}
export default workflow_producer;
//# sourceMappingURL=workflow.producer.js.map