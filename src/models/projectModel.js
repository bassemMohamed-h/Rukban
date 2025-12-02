import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique:true },
  desc:       { type: String },
  client:     { type: mongoose.Types.ObjectId, ref: 'client', required: true },
  department: { type: mongoose.Types.ObjectId, ref: 'department', required: true },
  package:    { type: mongoose.Types.ObjectId, ref: 'package', required: true },
  services:   [{ type: mongoose.Types.ObjectId, ref: 'service' }],
  tasks:      [{ type: mongoose.Types.ObjectId, ref: 'task' }],
  startDate:  { type: Date },
  endDate:    { type: Date },
  status:     { type: String, enum: ['draft','active','completed','cancelled'], default: 'draft' },
  createdBy:  { type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'user' },
  isActive:   {type:Boolean,default:true},
},
{timestamps: true,}
);

const projectModel = mongoose.model("project", projectSchema);
export default projectModel
