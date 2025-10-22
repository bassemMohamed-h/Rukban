const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  owners: [{ type: Types.ObjectId, ref: 'Employee' }], // owners are employees
  cmo: { type: Types.ObjectId, ref: 'Employee' }, // reference to the employee who is CMO
  partners: [{ type: Types.ObjectId, ref: 'Employee' }] // partners are employees flagged as isPartner
}, { timestamps: true });


// Company → employees
companySchema.virtual('employees', {
  ref: 'employeeModel',
  localField: '_id',
  foreignField: 'company'
});

// Company → departments
companySchema.virtual('departments', {
  ref: 'departmentModel',
  localField: '_id',
  foreignField: 'company'
});

// Company → owners (from ownerModel)
companySchema.virtual('owners', {
  ref: 'ownerModel',
  localField: '_id',
  foreignField: 'company'
});

companySchema.set("toObject", { virtuals: true });
companySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("company", companySchema);
