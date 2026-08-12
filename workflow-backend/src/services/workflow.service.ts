import { WorkFlowRespository } from "../respoistory/workflow.repository.js";


export class WorkFlowService{
    private repository = new WorkFlowRespository();


    async createWorkFlow(data : any){
      return await   this.repository.create(data);
    }

    async getAllWorkFlow(){
        return await this.repository.findAll();
    }
    async getWorkFlowById(id : string){
        return await this.repository.findById(id)
    }

    async FindIdAndUpdateWorkFlow(id : string , data : any){
        return await this.repository.update(id ,data)
    }
    async FindIdAndDeleteWorkFlow(id : string){
        return await this.repository.delete(id)
    }
}