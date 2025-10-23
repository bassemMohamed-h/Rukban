import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  contactInfo: [{ type: String, required: true }],
  clientEmail:{type:String, unique:true},
  companyName:String,
  companyCategory:{ type: String, required: true, default:"small" },
  address:String,
  companyPhone:[String],
  projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
  isActive:{type:Boolean,default:false}
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // Client → projects
// clientSchema.virtual('projects', {
//   ref: 'projectModel',
//   localField: '_id',
//   foreignField: 'client'
// });

clientSchema.set("toObject", { virtuals: true });
clientSchema.set("toJSON", { virtuals: true });
const clientModel = mongoose.model("client", clientSchema);
export default clientModel;
