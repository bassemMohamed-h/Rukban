import  mongoose  from "mongoose";
const subTeamSchema = new mongoose.Schema({
  name:         {type: String, unique:true, required: true, trim:true},
  email:        {type:String, unique:true, required: true, trim:true},
  teamId:       {type: mongoose.Types.ObjectId,   ref: 'team', required: true },
  departmentId: {type: mongoose.Types.ObjectId,   ref: 'department', required: true },
  subLeader:    {type: mongoose.Types.ObjectId,   ref: 'employee' }, // subTeam leader
  members:      [{type: mongoose.Types.ObjectId,  ref: 'employee' }],
  createdBy:    {type: mongoose.Types.ObjectId,   ref: 'user' },
  modifiedBy:   {type: mongoose.Types.ObjectId,   ref: 'user' }
}, { timestamps: true });

// // SubTeam → employees
// subTeamSchema.virtual('employees', {
//   ref: 'employeeModel',
//   localField: '_id',
//   foreignField: 'subTeam'
// });

subTeamSchema.set("toObject", { virtuals: true });
subTeamSchema.set("toJSON", { virtuals: true });
const subTeamModel = mongoose.model('subTeam', subTeamSchema);
export default subTeamModel;