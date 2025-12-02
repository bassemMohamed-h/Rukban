import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique:true},
  email:      {type:String, unique:true, trim:true},
  managerId:  { type: mongoose.Types.ObjectId, ref: 'employee' }, // depManager
  createdBy:  { type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'user' },
  isActive:   {type:Boolean, default:true}
}, 
{ timestamps: true });
departmentSchema.set("toObject", { virtuals: true });
departmentSchema.set("toJSON", { virtuals: true });
export default mongoose.model("department", departmentSchema);
