const { default: mongoose } = require("mongoose");

const packageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  // packages can be used by many projects (project holds reference)
  services: [{ type: Types.ObjectId, ref: 'Service' }] // convenience, many-to-many handled on Service side too
}, { timestamps: true });

// Package → projects
packageSchema.virtual('projects', {
  ref: 'projectModel',
  localField: '_id',
  foreignField: 'package'
});

// Package → services
packageSchema.virtual('services', {
  ref: 'serviceModel',
  localField: '_id',
  foreignField: 'packages'
});
packageSchema.set("toObject", { virtuals: true });
packageSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model('package',packageSchema);