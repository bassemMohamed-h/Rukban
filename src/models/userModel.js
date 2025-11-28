import bcrypt from "bcrypt"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    roles:[{type:mongoose.Types.ObjectId, ref:"role"}],
    employeeId:{type:mongoose.Types.ObjectId, ref:"employee"},
    departmentId:{type:mongoose.Types.ObjectId, ref:"department"},
    teamId:{type:mongoose.Types.ObjectId, ref:"team"},
    subTeamId:{type:mongoose.Types.ObjectId, ref:"subTeam"},
    isActive:{type:Boolean, default:false},
    lastLogin:Date
},{timestamps:true})
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next()
})
const userModel = mongoose.model("user", userSchema);
export default userModel