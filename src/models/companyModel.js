import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true,unique: true, trim:true},
  companyEmail: { type: String, unique: true, trim:true },
  phones:[String],
  address:String,
  social:[String],
  owners: [{ type: mongoose.Types.ObjectId, ref: 'owner' }],
  cmo: { type: mongoose.Types.ObjectId, ref: 'employee' }, // reference to the employee who is CMO
}, { timestamps: true });


// // Company → employees
// companySchema.virtual('employees', {
//   ref: 'employeeModel',
//   localField: '_id',
//   foreignField: 'company'
// });

// // Company → departments
// companySchema.virtual('departments', {
//   ref: 'departmentModel',
//   localField: '_id',
//   foreignField: 'company'
// });

// // Company → owners (from ownerModel)
// companySchema.virtual('owners', {
//   ref: 'ownerModel',
//   localField: '_id',
//   foreignField: 'company'
// });

companySchema.set("toObject", { virtuals: true });
companySchema.set("toJSON", { virtuals: true });

export default mongoose.model("company", companySchema);
