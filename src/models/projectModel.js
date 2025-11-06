import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  client: { type: mongoose.Types.ObjectId, ref: 'client', required: true },
  department: { type: mongoose.Types.ObjectId, ref: 'department', required: true }, // dynamic
  package: { type: mongoose.Types.ObjectId, ref: 'package', required: true },
  services: [{ type: mongoose.Types.ObjectId, ref: 'service' }], // convenience, often derived from package
  tasks: [{ type: mongoose.Types.ObjectId, ref: 'task' }],
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['draft','active','completed','cancelled'], default: 'draft' },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'employee' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'employee' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// //
// // ─── VIRTUALS ───────────────────────────────────────────────
// //

// // Project → services
// projectSchema.virtual('services', {
//   ref: 'serviceModel',
//   localField: 'services',
//   foreignField: '_id'
// });

// // Project → tasks
// projectSchema.virtual('tasks', {
//   ref: 'taskModel',
//   localField: 'tasks',
//   foreignField: '_id'
// });
projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });
export default mongoose.model("project", projectSchema);
