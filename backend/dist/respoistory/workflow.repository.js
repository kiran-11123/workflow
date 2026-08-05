import workflow_model from "../models/workflow.model.js";
export class WorkFlowRespository {
    async create(data) {
        await workflow_model.create(data);
    }
    async findAll() {
        await workflow_model.find();
    }
    async findById(id) {
        await workflow_model.findById(id);
    }
    async update(id, data) {
        await workflow_model.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        await workflow_model.findByIdAndDelete(id);
    }
}
//# sourceMappingURL=workflow.repository.js.map