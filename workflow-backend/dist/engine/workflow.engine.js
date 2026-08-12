import logger from "../utils/logger.setup.js";
import { WorkflowStatus, NodeType } from "../types/workflow.types.js";
import { EmailHandler } from "../handlers/email.handler.js";
const email_handler = EmailHandler.getInstance();
export class SingupExecuteEngine {
    async SingupFlowEngine(workflow, email) {
        logger.info(`Workflow engine started for workflow ${workflow.workflow_name}`);
        try {
            const nodes = workflow.nodes;
            const edges = workflow.edges;
            const startNode = nodes.find(node => node.type == NodeType.START);
            if (!startNode) {
                throw new Error("START node not found");
            }
            logger.info(`Starting workflow from node ${startNode.id}`);
            let CurrentNode = startNode;
            while (true) {
                logger.info(`Executing node ${CurrentNode.id} of type ${CurrentNode.type}`);
                const result = await this.executeNode(CurrentNode, email);
                logger.info(`workflow of type ${CurrentNode} executed successfully`);
                if (CurrentNode.type === "END")
                    break;
                const NextEdge = edges.find(edge => edge.source === CurrentNode.id);
                if (!NextEdge) {
                    throw new Error(`No outgoing edge found for node ${CurrentNode.id}`);
                }
                const nextNode = nodes.find(node => node.id === NextEdge.target);
                if (!nextNode) {
                    throw new Error(`Target node ${NextEdge.target} not found`);
                }
                CurrentNode = nextNode;
            }
            logger.info(`Workflow ${workflow.workflow_name} reached END node`);
            return true;
        }
        catch (er) {
            logger.info(`Error while executing the workflow ${er}`);
            throw er;
        }
    }
    async executeNode(node, email) {
        switch (node.type) {
            case NodeType.START:
                logger.info(`Start node executed`);
                break;
            case NodeType.EMAIL:
                logger.info(`Email node started`);
                try {
                    const result = await email_handler.sendEmail({ to: email, subject: node.config.subject, text: node.config.text, html: node.config.html });
                    if (result == true) {
                        logger.info(`Email node executed successfully`);
                    }
                    return result;
                }
                catch (er) {
                    logger.info(`Error in the signup workflow for email ${email} : ${er}`);
                    throw er;
                }
                finally {
                    break;
                }
            case NodeType.END:
                logger.info(`End node executed`);
                break;
        }
    }
}
//# sourceMappingURL=workflow.engine.js.map