import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  phones: [{ type: String, required: true }],
  email:{type:String, unique:true},
  companyName:String,
  companyCategory:{
     type: String,
     enum: ["small","medium","large"],
     default:"small",
     required: true
    },
  companyAddress:String,
  companyPhones:[String],
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  isActive:{type:Boolean,default:true},
  createdBy: { type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'user' }
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
