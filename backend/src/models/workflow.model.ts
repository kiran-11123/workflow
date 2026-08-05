import mongoose from "mongoose";


export const NodeSchema = new mongoose.Schema({
     
    id : {type : String , required : true},
    type :{type : String , requied :true},
    config : {
        type : Object,
        default :{}
    }
})

export const EdgeSchema  =new mongoose.Schema({
     
    source  :{type  : String , required : true},
    target  :{type  : String , required  : true},
    condition : {type  : String }
})

const WorkFlowSchema = new mongoose.Schema({

    workflow_name : {type :String , required  :true},
    description : {type : String},
    version  :{type : Number , default : 1},
    status : {type : String , default : "DRAFT"},
    nodes : [NodeSchema],
    edges  :[EdgeSchema]


},{
    timestamps : true
})

const workflow_model  = mongoose.model('workflows' , WorkFlowSchema);
export default workflow_model