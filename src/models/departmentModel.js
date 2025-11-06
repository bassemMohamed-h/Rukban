import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true},
  email:{type:String, unique:true, trim:true},
  company: { type: mongoose.Types.ObjectId, ref: 'Company', required: true },
  manager: { type: mongoose.Types.ObjectId, ref: 'Employee' }, // depManager
  teams: [{ type: mongoose.Types.ObjectId, ref: 'Team' }],     // convenience array
  createdBy:{ type: mongoose.Types.ObjectId, ref: 'Employee' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

// /** 🧮 Virtuals */
// // Department → teams
// departmentSchema.virtual('teams', {
//   ref: 'teamModel',
//   localField: '_id',
//   foreignField: 'department'
// });

// // Department → employees
// departmentSchema.virtual('employees', {
//   ref: 'employeeModel',
//   localField: '_id',
//   foreignField: 'department'
// });

// // Department → projects
// departmentSchema.virtual('projects', {
//   ref: 'projectModel',
//   localField: '_id',
//   foreignField: 'department'
// });

// // Department → suppliers
// departmentSchema.virtual('suppliers', {
//   ref: 'supplierModel',
//   localField: '_id',
//   foreignField: 'department'
// });

departmentSchema.set("toObject", { virtuals: true });
departmentSchema.set("toJSON", { virtuals: true });
export default mongoose.model("department", departmentSchema);
