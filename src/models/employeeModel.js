import { Schema, model , Types} from "mongoose";

const employeeSchema = new Schema({
  firstname:{ type: String, required: true,trim: true },
  lastname: { type: String, required: true,trim: true },
  title:    {type: String, required: true,trim: true },
  email:    { type: String, unique:true,trim: true },
  phones:   [String],
  address:  String  ,
  salary:   Number,
  company:  { type: Types.ObjectId, ref: 'company' },
  // membership (an employee may belong to one dept/team/subTeam or none)
  department: { type: Types.ObjectId, ref: 'department' }, // optional
  team:       { type: Types.ObjectId, ref: 'team' },       // optional
  subTeam:    { type: Types.ObjectId, ref: 'subTeam' },    // optional
  createdBy:  { type: Types.ObjectId, ref: 'employee' },
  modifedBy:  { type: Types.ObjectId, ref: 'employee' },
  // tasks assigned to this employee (inverse available by query)
  // You can maintain an array for convenience, but it's redundant since Task.assignedTo exists.
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

// // Employee → tasks
// employeeSchema.virtual('task', {
//   ref: 'taskModel',
//   localField: '_id',
//   foreignField: 'assignedTo'
// });

// // Employee → company (reverse of company.cmo)
// employeeSchema.virtual('company', {
//   ref: 'companyModel',
//   localField: '_id',
//   foreignField: 'cmo'
// });

employeeSchema.set("toObject", { virtuals: true });
employeeSchema.set("toJSON", { virtuals: true });
const employeeModel = model('employee', employeeSchema);
export default employeeModel;
