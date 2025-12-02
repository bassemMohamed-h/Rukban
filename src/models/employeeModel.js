import mongoose from "mongoose";
import userModel from "./userModel.js";
import { AppError } from "../utils/AppError.js";
const employeeSchema = new mongoose.Schema({
  firstname:{ type: String, required: true,trim: true },
  lastname: { type: String, required: true,trim: true },
  title:    {type: String, required: true,trim: true },
  email:    { type: String, unique:true,trim: true },
  phones:   [String],
  address:  String  ,
  salary:   Number,
  departmentId: { type: mongoose.Types.ObjectId, ref: 'department' }, // optional
  teamId:       { type: mongoose.Types.ObjectId, ref: 'team' },       // optional
  subTeamId:    { type: mongoose.Types.ObjectId, ref: 'subTeam' },    // optional
  createdBy:    { type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy:   { type: mongoose.Types.ObjectId, ref: 'user' },
  isActive: { type: Boolean, default: true }
}, 
{ timestamps: true });
try {
  // sync updated user data
  const fields = ['email','departmentId','teamId','subTeamId'];
  const update ={};
  employeeSchema.post(["findOneAndUpdate"],async (doc)=>{
    if(!doc) return
    const employeeId = doc._id;
    const userId = await userModel.findOne({employeeId}).select("_id")    
    if(!userId) return
    fields.forEach(Key => {
      if(doc[Key]!== undefined) update[Key] = doc[Key]
    });
    if(!Object.keys(update).length) return
    await userModel.findOneAndUpdate({_id:userId},update)  
  })
  // delete user when delete employee
  employeeSchema.post(["findOneAndDelete"], async (doc)=>{
    console.log("Deleted Employee:", doc);
    if(!doc || !doc._id) return
    const employeeId = doc._id;  
    await userModel.findOneAndDelete({employeeId});    
  })
} catch (error) {
  throw new AppError("catch erorr while sync updated user data",404)
}
employeeSchema.set("toObject", { virtuals: true });
employeeSchema.set("toJSON", { virtuals: true });
const employeeModel = mongoose.model('employee', employeeSchema);
export default employeeModel;
