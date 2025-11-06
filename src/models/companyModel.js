import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true, trim:true},
  email: { type: String, unique: true, trim:true },
  phones:[String],
  address:String,
  social:[{name:String, link:String}],
  owners: [{type: mongoose.Types.ObjectId, ref: 'owner'}],
  cmo: { type: mongoose.Types.ObjectId, ref: 'employee' }, // reference to the employee who is CMO
  createdBy:{ type: mongoose.Types.ObjectId, ref: 'employee' },
  modifiedBy:{ type: mongoose.Types.ObjectId, ref: 'employee' }
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
