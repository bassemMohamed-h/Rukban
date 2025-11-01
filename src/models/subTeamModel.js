import  mongoose  from "mongoose";
const subTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
  leader: { type: mongoose.Types.ObjectId, ref: 'Employee' }, // subTeam leader
  members: [{ type: mongoose.Types.ObjectId, ref: 'Employee' }]
}, { timestamps: true });

// // SubTeam → employees
// subTeamSchema.virtual('employees', {
//   ref: 'employeeModel',
//   localField: '_id',
//   foreignField: 'subTeam'
// });

subTeamSchema.set("toObject", { virtuals: true });
subTeamSchema.set("toJSON", { virtuals: true });
const subTeamModel = mongoose.model('SubTeam', subTeamSchema);
export default subTeamModel;