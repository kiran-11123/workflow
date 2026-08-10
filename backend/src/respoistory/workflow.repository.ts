import workflow_model from "../models/workflow.model.js";
import mongoose from "mongoose";

export class WorkFlowRespository{
     
    async create(data : any){
         await workflow_model.create(data)
    }

    async findAll(){
        return  await workflow_model.find()
    }

    async findById(id : string){
        const new_id = new mongoose.Types.ObjectId(id);
        return  await workflow_model.findById(new_id);
    }

    async update(id :string , data : any){
        const new_id = new mongoose.Types.ObjectId(id);
       return   await workflow_model.findByIdAndUpdate(
            new_id,
            data,
            {new : true}
         )
    }

    async delete(id : string){
        await workflow_model.findByIdAndDelete(id);
    }
}