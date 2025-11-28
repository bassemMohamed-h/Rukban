import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name:         {type: String, required: true, unique:true, trim:true },
  email:        {type: String, required: true, unique:true, trim:true},
  departmentId: {type: mongoose.Types.ObjectId, ref: 'department', required: true },
  leader:       {type: mongoose.Types.ObjectId, ref: 'employee' }, // teamLeader
  members:      [{type: mongoose.Types.ObjectId, ref: 'employee' }], // convenience
  createdBy:    {type: mongoose.Types.ObjectId, ref: 'user' },
  modifiedBy:   {type: mongoose.Types.ObjectId, ref: 'user' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // Team → subTeams
// teamSchema.virtual('subTeams', {
//   ref: 'subTeamModel',
//   localField: '_id',
//   foreignField: 'team'
// });

// // Team → employees
// teamSchema.virtual('employees', {
//   ref: 'employeeModel',
//   localField: '_id',
//   foreignField: 'team'
// });

teamSchema.set("toObject", { virtuals: true });
teamSchema.set("toJSON", { virtuals: true });
const teamModel = mongoose.model("team", teamSchema);
export default teamModel;
