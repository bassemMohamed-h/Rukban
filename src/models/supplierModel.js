import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  name:         {type: String, required: true, unique:true},
  phones:       [{ type: String }],
  department:   {type: mongoose.Types.ObjectId, ref: 'department', required: true}, // must belong to a department (e.g., Finance)
  materials:    [{type: mongoose.Types.ObjectId, ref: 'material'}], // inverse many-to-many
  createdBy:    {type: mongoose.Types.ObjectId, ref: 'user'},
  modifiedBy :  {type: mongoose.Types.ObjectId, ref: 'user'}
}, 
{timestamps: true});
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