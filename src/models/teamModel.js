import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name:         {type: String, required: true, unique:true, trim:true },
  email:        {type: String, required: true, unique:true, trim:true},
  departmentId: {type: mongoose.Types.ObjectId, ref: 'department', required: true },
  leader:       {type: mongoose.Types.ObjectId, ref: 'employee' }, // teamLeader
  members:      [{type: mongoose.Types.ObjectId, ref: 'employee' }], // convenience
  createdBy:    {type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy:   {type: mongoose.Types.ObjectId, ref: 'user' },
  isActive:     {type: Boolean, default: true},
},
{timestamps: true,}
);
teamSchema.set("toObject", { virtuals: true });
teamSchema.set("toJSON", { virtuals: true });
const teamModel = mongoose.model("team", teamSchema);
export default teamModel;
