const mongoose = require("mongoose")
const materialSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String },
  suppliers: [{ type: Types.ObjectId, ref: 'Supplier' }], // many-to-many
  services: [{ type: Types.ObjectId, ref: 'Service' }],   // inverse
  details: { type: String }
}, { timestamps: true });
// Material → services
materialSchema.virtual('services', {
  ref: 'serviceModel',
  localField: '_id',
  foreignField: 'materials'
});

// Material → suppliers
materialSchema.virtual('suppliers', {
  ref: 'supplierModel',
  localField: '_id',
  foreignField: 'materials'
});
materialSchema.set("toObject", { virtuals: true });
materialSchema.set("toJSON", { virtuals: true });
const materialModel = mongoose.model('material',materialSchema);
module.exports = materialModel