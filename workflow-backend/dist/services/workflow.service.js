import { WorkFlowRespository } from "../respoistory/workflow.repository.js";
export class WorkFlowService {
    repository = new WorkFlowRespository();
    async createWorkFlow(data) {
        return await this.repository.create(data);
    }
    async getAllWorkFlow() {
        return await this.repository.findAll();
    }
    async getWorkFlowById(id) {
        return await this.repository.findById(id);
    }
    async FindIdAndUpdateWorkFlow(id, data) {
        return await this.repository.update(id, data);
    }
    async FindIdAndDeleteWorkFlow(id) {
        return await this.repository.delete(id);
    }
}
//# sourceMappingURL=workflow.service.js.map