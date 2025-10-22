const mongoose = require("mongoose");
const { Schema, model , Types} = require("mongoose");


const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false },
  phones: [{ type: String, required: false }],
  adress: { type: String, required: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roleModel" },

  company: { type: Types.ObjectId, ref: 'Company', required: true },

  // membership (an employee may belong to one dept/team/subTeam or none)
  department: { type: Types.ObjectId, ref: 'Department' }, // optional
  team: { type: Types.ObjectId, ref: 'Team' },             // optional
  subTeam: { type: Types.ObjectId, ref: 'SubTeam' },       // optional

  // tasks assigned to this employee (inverse available by query)
  // You can maintain an array for convenience, but it's redundant since Task.assignedTo exists.
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Employee → tasks
employeeSchema.virtual('task', {
  ref: 'taskModel',
  localField: '_id',
  foreignField: 'assignedTo'
});

// Employee → company (reverse of company.cmo)
employeeSchema.virtual('company', {
  ref: 'companyModel',
  localField: '_id',
  foreignField: 'cmo'
});

employeeSchema.set("toObject", { virtuals: true });
employeeSchema.set("toJSON", { virtuals: true });
const employeeModel = model('employee', employeeSchema);
module.exports = employeeModel;
