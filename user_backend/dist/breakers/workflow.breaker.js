import CircuitBreaker from "opossum";
import { checkWorkFlowService } from "../clients/workflow.client.js";
const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000
};
export const WorkflowBreaker = new CircuitBreaker(checkWorkFlowService, options);
WorkflowBreaker.on("open", () => {
    console.log(`Workflow circuit is open`);
});
WorkflowBreaker.on("halfOpen", () => {
    console.log(`Workflow circuit is halfopen`);
});
WorkflowBreaker.on("close", () => {
    console.log(`Workflow circuit is closed`);
});
WorkflowBreaker.on("success", () => {
    console.log("Workflow request SUCCESS");
});
WorkflowBreaker.on("failure", (error) => {
    console.log(`Workflow circuit failed , ${error.message}`);
});
WorkflowBreaker.on("timeout", () => {
    console.log("Workflow request TIMEOUT");
});
WorkflowBreaker.on("reject", () => {
    console.log("Workflow request REJECTED");
});
//# sourceMappingURL=workflow.breaker.js.map