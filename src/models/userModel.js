import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
const userSchema = new mongoose.Schema({
    username:       {type:String, required:true, unique:true},
    email:          {type:String, required:true, unique:true},
    password:       {type:String, required:true},
    roles:          [{type:mongoose.Types.ObjectId, ref:"role"}],
    employeeId:     {type:mongoose.Types.ObjectId, ref:"employee"},
    departmentId:   {type:mongoose.Types.ObjectId, ref:"department"},
    teamId:         {type:mongoose.Types.ObjectId, ref:"team"},
    subTeamId:      {type:mongoose.Types.ObjectId, ref:"subTeam"},
    isActive:       {type:Boolean, default:true},
    modifiedBy:   {type: mongoose.Types.ObjectId, ref: 'user' },
    lastLogin:Date
},
{timestamps:true})
try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, salt);
    return next()
    })
    userSchema.pre("findOneAndUpdate", async function(next) {
    const update = this.getUpdate();
    if (!update.password) return next();
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
    next();
    });

} catch (error) {
    console.log({error});
    throw new AppError("error while hashing password",404)
}
const userModel = mongoose.model("user", userSchema);
export default userModel