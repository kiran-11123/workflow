import workflow_model from "../models/workflow.model.js";
import mongoose from "mongoose";
export class WorkFlowRespository {
    async create(data) {
        await workflow_model.create(data);
    }
    async findAll() {
        await workflow_model.find();
    }
    async findById(id) {
        const new_id = new mongoose.Types.ObjectId(id);
        return await workflow_model.findById(new_id);
    }
    async update(id, data) {
        const new_id = new mongoose.Types.ObjectId(id);
        return await workflow_model.findByIdAndUpdate(new_id, data, { new: true });
    }
    async delete(id) {
        await workflow_model.findByIdAndDelete(id);
    }
}
//# sourceMappingURL=workflow.repository.js.map