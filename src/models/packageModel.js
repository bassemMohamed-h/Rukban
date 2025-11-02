import mongoose from "mongoose";

const packagesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  // packages can be used by many projects (project holds reference)
  services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }] // convenience, many-to-many handled on Service side too
}, { timestamps: true });

// // Package → projects
// packagesSchema.virtual('projects', {
//   ref: 'projectModel',
//   localField: '_id',
//   foreignField: 'package'
// });

// // Package → services
// packagesSchema.virtual('services', {
//   ref: 'serviceModel',
//   localField: '_id',
//   foreignField: 'packages'
// });

packagesSchema.set("toObject", { virtuals: true });
packagesSchema.set("toJSON", { virtuals: true });
export default mongoose.model('package',packagesSchema);
