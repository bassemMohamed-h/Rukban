const { default: mongoose } = require("mongoose");

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  department: { type: Types.ObjectId, ref: 'Department', required: true }, // must belong to a department (e.g., Finance)
  materials: [{ type: Types.ObjectId, ref: 'Material' }], // inverse many-to-many
  deals: [{ type: Types.ObjectId, ref: 'Project' }] // optional: supplier deals with projects if needed
}, { timestamps: true });
// Supplier → materials
supplierSchema.virtual('materials', {
  ref: 'materialModel',
  localField: '_id',
  foreignField: 'suppliers'
});

// Supplier → projects (deals)
supplierSchema.virtual('deals', {
  ref: 'projectModel',
  localField: 'deals',
  foreignField: '_id'
});
supplierSchema.set("toObject", { virtuals: true });
supplierSchema.set("toJSON", { virtuals: true });
const supplierModel = mongoose.model('supplier',supplierSchema);

module.exports = supplierModel;