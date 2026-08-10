import { Kafka } from "kafkajs";
import logger from "../utils/logger.setup.js";
const kafka = new Kafka({
    clientId: "workflow_service",
    brokers: ["localhost:9092"],
});
logger.info('kafka connected');
export default kafka;
//# sourceMappingURL=kafka.connection.js.map