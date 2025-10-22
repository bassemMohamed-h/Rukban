const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
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
    ref: "userModel",
    required: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel"
  }
}, { timestamps: true });
// Owner → company
ownerSchema.virtual('companyInfo', {
  ref: 'companyModel',
  localField: 'company',
  foreignField: '_id',
  justOne: true
});
ownerSchema.set("toObject", { virtuals: true });
ownerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Owner", ownerSchema);
