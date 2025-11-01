const mongoose = require("mongoose");

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  client: { type: Types.ObjectId, ref: 'client', required: true },
  department: { type: Types.ObjectId, ref: 'cepartment', required: true }, // dynamic
  package: { type: Types.ObjectId, ref: 'package', required: true },
  services: [{ type: Types.ObjectId, ref: 'service' }], // convenience, often derived from package
  tasks: [{ type: Types.ObjectId, ref: 'task' }],
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['draft','active','completed','cancelled'], default: 'draft' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// ─── VIRTUALS ───────────────────────────────────────────────
//

// Project → services
projectSchema.virtual('services', {
  ref: 'serviceModel',
  localField: 'services',
  foreignField: '_id'
});

// Project → tasks
projectSchema.virtual('tasks', {
  ref: 'taskModel',
  localField: 'tasks',
  foreignField: '_id'
});
projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("project", projectSchema);
