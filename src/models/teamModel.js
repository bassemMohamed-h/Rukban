import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: mongoose.Types.ObjectId, ref: 'Department', required: true },
  leader: { type: mongoose.Types.ObjectId, ref: 'Employee' }, // teamLeader
  members: [{ type: mongoose.Types.ObjectId, ref: 'Employee' }], // convenience
  subTeams: [{ type: mongoose.Types.ObjectId, ref: 'SubTeam' }]
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
