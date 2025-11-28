import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true},
  email:{type:String, unique:true, trim:true},
  managerId: { type: mongoose.Types.ObjectId, ref: 'employee' }, // depManager
  createdBy:{ type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'user' }
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
//   foreignField: 'departmentId'
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
