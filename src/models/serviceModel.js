import mongoose from "mongoose";
import materialModel from "./materialModel.js";
const serviceSchema = new mongoose.Schema(
  {
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

    // Minimum expected price for the service
    minPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Maximum expected price for the service
    maxPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Category helps group services (e.g., "Marketing", "Design", "Development")
    category: {
      type: String,
      trim: true,
    },
    packages: [{ type: mongoose.Types.ObjectId,  ref: 'package' }], // many-to-many
    tasks: [{ type: mongoose.Types.ObjectId,     ref: 'task' }],       // many-to-many
    materials: [{ type: mongoose.Types.ObjectId, ref: 'material' }],// many-to-many
    // Created & modified by users/employees
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },

    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
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
// // Service → packages
// serviceSchema.virtual('packages', {
//   ref: 'packageModel',
//   localField: '_id',
//   foreignField: 'services'
// });

// // Service → tasks
// serviceSchema.virtual('tasks', {
//   ref: 'taskModel',
//   localField: '_id',
//   foreignField: 'services'
// });

// // Service → materials
// serviceSchema.virtual('materials', {
//   ref: 'materialModel',
//   localField: '_id',
//   foreignField: 'services'
// });
// serviceSchema.set("toObject", { virtuals: true });
// serviceSchema.set("toJSON", { virtuals: true });

const serviceModel = mongoose.model("service", serviceSchema);
export default serviceModel;
