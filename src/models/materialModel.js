import mongoose from "mongoose"
import supplierModel from "./supplierModel.js";
import { AppError } from "../utils/AppError.js";
const materialSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique:true },
  desc:       String,
  supplier:   {type: mongoose.Types.ObjectId, ref: 'supplier', required:true}, // many-to-many
  services:   [{type: mongoose.Types.ObjectId, ref: 'service'}],   // inverse
  createdBy:  {type:mongoose.Types.ObjectId, ref:"user"},
  modifiedBy: {type:mongoose.Types.ObjectId, ref:"user"},
  isActive:   {type:Boolean, default:true}
}, 
{ timestamps: true });

//sync supplier material
materialSchema.post(["save","findOneAndUpdate"],async (doc)=>{
  try {
    if(doc.supplier){
    await supplierModel.findByIdAndUpdate(doc.supplier,{
      $addToSet: {materials:doc._id}
    })
    console.log(`supplier provide ${doc._id} material`);
  }
  } catch (error) {
    console.log(error);
    
    throw new AppError("catch Erorr:",400)
  }
})
// sync supplier material
materialSchema.post("findOneAndDelete",async (doc)=>{
  try {
    if(doc.supplier){
    await supplierModel.findByIdAndUpdate(doc.supplier,{
      $pull: {materials:doc._id}
    })
    console.log(`supplier not provide ${doc._id} material`);
  }
  } catch (error) {
    throw new AppError("catch Erorr:",400)
  }
})
materialSchema.set("toObject", { virtuals: true });
materialSchema.set("toJSON", { virtuals: true });
const materialModel = mongoose.model('material',materialSchema);
export default materialModel