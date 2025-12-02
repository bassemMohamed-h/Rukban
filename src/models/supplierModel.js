import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  name:         {type: String, required: true, unique:true},
  phones:       [{type: String }],
  department:   {type: mongoose.Types.ObjectId, ref: 'department', required: true}, // must belong to a department (e.g., Finance)
  materials:    [{type: mongoose.Types.ObjectId, ref: 'material'}], // inverse many-to-many
  createdBy:    {type: mongoose.Types.ObjectId, ref: 'user'},
  modifiedBy :  {type: mongoose.Types.ObjectId, ref: 'user'},
  isActive:     {type: Boolean, default: true},
}, 
{timestamps: true});
supplierSchema.set("toObject", { virtuals: true });
supplierSchema.set("toJSON", { virtuals: true });
const supplierModel = mongoose.model('supplier',supplierSchema);
export default supplierModel;