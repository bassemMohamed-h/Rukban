const mongoose = require("mongoose")
const subTeamSchema = new Schema({
  name: { type: String, required: true },
  team: { type: Types.ObjectId, ref: 'Team', required: true },
  leader: { type: Types.ObjectId, ref: 'Employee' }, // subTeam leader
  members: [{ type: Types.ObjectId, ref: 'Employee' }]
}, { timestamps: true });
// SubTeam → employees
subTeamSchema.virtual('employees', {
  ref: 'employeeModel',
  localField: '_id',
  foreignField: 'subTeam'
});
subTeamSchema.set("toObject", { virtuals: true });
subTeamSchema.set("toJSON", { virtuals: true });
const subTeamModel = model('SubTeam', subTeamSchema);
module.exports = subTeamModel;