import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import employeeModel from "../models/employeeModel.js";
import userModel from "../models/userModel.js";

const signup = async (data) => {
  const { email, username, password } = data;
  //check if it's already user
  const isUser = await userModel.findOne({$or:[{username},{email}]})  
  if(isUser) throw new AppError("username or email is already exist",400)
  //check if it's employee
  const isEmployee = await employeeModel.findOne({email})
  if(!isEmployee) throw new AppError("email doesn't exist",400)  
  try {  
    // create new user
    const user = new userModel({
      username,
      password,
      email,
      isActive:true,
      employeeId:isEmployee._id || null,
      departmentId:isEmployee.departmentId || null,
      teamId:isEmployee.teamId || null,
      subTeamId:isEmployee.subTeamId|| null
    })
    await user.save(); 
  } catch (error) {
    console.log({error});
    throw new AppError("erorr while signup",404)
  }
};

const signin = async (data) => {
  const { username, password } = data;
  const isUser = await userModel.findOne({$or:[{username},{email:username}]})    
  if(!isUser) throw new AppError("username is not exist",404)
  const isMatch= await bcrypt.compare(password, isUser.password);
  if(!isMatch) throw new AppError("Invalid credentials",401);
    const token = generateToken({
        _id: isUser._id,
    });
    return {token};
};
export default {signin,signup}