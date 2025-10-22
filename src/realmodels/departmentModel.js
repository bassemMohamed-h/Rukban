const mongoose = require("mongoose");

const departmentSchema = new Schema({
  name: { type: String, required: true },
  company: { type: Types.ObjectId, ref: 'Company', required: true },
  manager: { type: Types.ObjectId, ref: 'Employee' }, // depManager
  teams: [{ type: Types.ObjectId, ref: 'Team' }],     // convenience array
  suppliers: [{ type: Types.ObjectId, ref: 'Supplier' }] // suppliers the department deals with
}, { timestamps: true });

/** 🧮 Virtuals */
// Department → teams
departmentSchema.virtual('teams', {
  ref: 'teamModel',
  localField: '_id',
  foreignField: 'department'
});

// Department → employees
departmentSchema.virtual('employees', {
  ref: 'employeeModel',
  localField: '_id',
  foreignField: 'department'
});

// Department → projects
departmentSchema.virtual('projects', {
  ref: 'projectModel',
  localField: '_id',
  foreignField: 'department'
});

// Department → suppliers
departmentSchema.virtual('suppliers', {
  ref: 'supplierModel',
  localField: '_id',
  foreignField: 'department'
});

departmentSchema.set("toObject", { virtuals: true });
departmentSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("department", departmentSchema);
