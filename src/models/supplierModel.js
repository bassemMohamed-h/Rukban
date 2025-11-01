import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  department: { type: mongoose.Types.ObjectId, ref: 'Department', required: true }, // must belong to a department (e.g., Finance)
  materials: [{ type: mongoose.Types.ObjectId, ref: 'Material' }], // inverse many-to-many
  deals: [{ type: mongoose.Types.ObjectId, ref: 'Project' }] // optional: supplier deals with projects if needed
}, { timestamps: true });
// // Supplier → materials
// supplierSchema.virtual('materials', {
//   ref: 'materialModel',
//   localField: '_id',
//   foreignField: 'suppliers'
// });

// // Supplier → projects (deals)
// supplierSchema.virtual('deals', {
//   ref: 'projectModel',
//   localField: 'deals',
//   foreignField: '_id'
// });
supplierSchema.set("toObject", { virtuals: true });
supplierSchema.set("toJSON", { virtuals: true });
const supplierModel = mongoose.model('supplier',supplierSchema);

export default supplierModel;