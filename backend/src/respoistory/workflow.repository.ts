import workflow_model from "../models/workflow.model.js";


export class WorkFlowRespository{
     
    async create(data : any){
         await workflow_model.create(data)
    }

    async findAll(){
         await workflow_model.find()
    }

    async findById(id : string){
        await workflow_model.findById(id);
    }

    async update(id :string , data : any){
         await workflow_model.findByIdAndUpdate(
            id,
            data,
            {new : true}
         )
    }

    async delete(id : string){
        await workflow_model.findByIdAndDelete(id);
    }
}