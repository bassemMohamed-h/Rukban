import mongoose from "mongoose";
import materialModel from "./materialModel.js";
import { AppError } from "../utils/AppError.js";
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  desc: {
    type: String,
    trim: true,
  },
  minPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  packages:   [{type: mongoose.Types.ObjectId,      ref: 'package' }],
  tasks:      [{type: mongoose.Types.ObjectId,      ref: 'task' }],       
  materials:  [{type: mongoose.Types.ObjectId,      ref: 'material' }],
  createdBy:  {type: mongoose.Schema.Types.ObjectId,ref: "user"},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId,ref: "user"},
  isActive:   {type: Boolean, default: true},
},
{timestamps: true,}
);
try {
  // sync services to materials model 
  serviceSchema.post(["findOneAndUpdate","save"],async (doc)=>{

    if(doc.materials){
      await materialModel.updateMany(
        {_id:{$in:doc.materials}},{
        $addToSet:{services:doc._id}
      });
      console.log(`material Service Updated ${doc.materials}`); 
  }
  })
  serviceSchema.post("findOneAndDelete",async (doc)=>{
    if(doc.materials?.length){
      await materialModel.updateMany(
        {_id:{$in:doc.materials}},{
        $pull:{services:doc._id}
      });
      console.log(`material Service deleted ${doc.materials}`); 
  }
  })
} catch (error) {
  console.log({error});
  throw new AppError("error while sync service",400)
}
serviceSchema.set("toObject", { virtuals: true });
serviceSchema.set("toJSON", { virtuals: true });
const serviceModel = mongoose.model("service", serviceSchema);
export default serviceModel;
