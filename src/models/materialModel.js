import mongoose from "mongoose"
const materialSchema = new mongoose.Schema({
  materialName: { type: String, required: true, unique:true },
  sku:  { type: String, unique:true },
  suppliers: [{ type: mongoose.Types.ObjectId, ref: 'Supplier' }], // many-to-many
  services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],   // inverse
  details: { type: String }
}, { timestamps: true });

// // Material → services
// materialSchema.virtual('services', {
//   ref: 'serviceModel',
//   localField: '_id',
//   foreignField: 'materials'
// });

// // Material → suppliers
// materialSchema.virtual('suppliers', {
//   ref: 'supplierModel',
//   localField: '_id',
//   foreignField: 'materials'
// });
materialSchema.set("toObject", { virtuals: true });
materialSchema.set("toJSON", { virtuals: true });
const materialModel = mongoose.model('material',materialSchema);
export default materialModel