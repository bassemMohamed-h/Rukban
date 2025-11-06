import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  desc: String,
  permissions: [
    {
      type: String,
      trim: true
    }
  ],
  createdBy: {type:mongoose.Types.ObjectId, ref:"employee"},
  modifiedBy: {type:mongoose.Types.ObjectId, ref:"employee"},
  isActive:{type:Boolean,default:false}
}, { timestamps: true });


// // Example virtual (count how many employees have this role)
// roleSchema.virtual("employees", {
//   ref: "employeeModel",
//   localField: "_id",
//   foreignField: "role"
// });

// // Enable virtuals
roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { virtuals: true });

export default mongoose.model("roleModel", roleSchema);
