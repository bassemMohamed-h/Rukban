import mongoose from "mongoose";

const packagesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  desc: { type: String },
  services:   [{ type: mongoose.Types.ObjectId, ref: 'service' }],
  createdBy:  { type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'user' },
  isActive:   {type:Boolean,default:true},
}, 
{ timestamps: true });
packagesSchema.set("toObject", { virtuals: true });
packagesSchema.set("toJSON", { virtuals: true });
export default mongoose.model('package',packagesSchema);
