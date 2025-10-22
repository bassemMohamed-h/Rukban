const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  permissions: [
    {
      type: String,
      trim: true
    }
  ],
  isActive:{type:Boolean,default:false}
}, { timestamps: true });


// Example virtual (count how many employees have this role)
roleSchema.virtual("employees", {
  ref: "employeeModel",
  localField: "_id",
  foreignField: "role"
});

// Enable virtuals
roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("roleModel", roleSchema);
