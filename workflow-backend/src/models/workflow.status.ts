import mongoose from "mongoose";

const Wokrflow_status_schema = new mongoose.Schema({

    email : {type  : String  , required : true},
    workflow_name : {type : String ,  required : true},
    idempotent_key  :{type  : String ,  required : true},
    status : {type   : String , default : 'Processing'}  

})

const workflow_status = mongoose.model('workflow_status' , Wokrflow_status_schema);
export default workflow_status;