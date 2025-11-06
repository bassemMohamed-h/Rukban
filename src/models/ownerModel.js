import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String,required:true},
    phones:[String],
    role:{type:String, enum:["owner"], default:"owner"},
    username: String,
    password: String,
    isActive:{type:Boolean, default:false},
    createdBy:{type:mongoose.Types.ObjectId, ref:"owner"},
    modifiedBy:{type:mongoose.Types.ObjectId, ref:"owner"}
})

const ownerModel = mongoose.model("owner",ownerSchema);
export default ownerModel