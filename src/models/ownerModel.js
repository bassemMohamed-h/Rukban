import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique:true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "companyModel"
  }],
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roleModel",
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  }
}, { timestamps: true });
// // Owner → company
// ownerSchema.virtual('companyInfo', {
//   ref: 'companyModel',
//   localField: 'company',
//   foreignField: '_id',
//   justOne: true
// });
ownerSchema.set("toObject", { virtuals: true });
ownerSchema.set("toJSON", { virtuals: true });

export default mongoose.model("owner", ownerSchema);
