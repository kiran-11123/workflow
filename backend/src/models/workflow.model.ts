import mongoose from "mongoose";
import { WorkflowStatus , NodeType } from "../types/workflow.types.js";

export const NodeSchema = new mongoose.Schema({
     
    id : {type : String , required : true},
    type :{type : String , enum : Object.values(NodeType),  required :true},
    config : {
        type : Object,
        default :{}
    }
},{
    _id : false
})

export const EdgeSchema  =new mongoose.Schema({
     
    source  :{type  : String , required : true},
    target  :{type  : String , required  : true},
    condition : {type  : String }
} ,{
    _id : false
})

const WorkFlowSchema = new mongoose.Schema({

    workflow_name : {type :String , required  :true},
    description : {type : String},
    version  :{type : Number , default : 1},
    status : {type : String , enum : Object.values(WorkflowStatus),default : WorkflowStatus.DRAFT},
    nodes : [NodeSchema],
    edges  :[EdgeSchema]
},{
    timestamps : true
})



const workflow_model  = mongoose.model('workflows' , WorkFlowSchema);
export default workflow_model