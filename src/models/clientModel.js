import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phones: [{ type: String, required: true }],
  email:{type:String, unique:true},
  companyName:String,
  companyCategory:{ type: String, required: true, default:"small" },
  companyAddress:String,
  companyPhones:[String],
  projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
  isActive:{type:Boolean,default:false},
  createdBy: { type: mongoose.Types.ObjectId, ref: 'employee' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'employee' }
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
