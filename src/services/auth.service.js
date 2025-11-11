import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import employeeModel from "../models/employeeModel.js";
import userModel from "../models/userModel.js";

const signup = async (data) => {
  const { email, username, password } = data;
  //check if it's already user
  const isUser = await userModel.findOne({$or:[{username, email}]})
  if(isUser) throw new AppError("username or email is already exist",400)
  //check if it's employee
  const isemployee = await employeeModel.findOne({email})
  if(!isemployee) throw new AppError("employee doesn't exist",400)
  // create new user
  const user = new userModel({
    username,
    password,
    email,
    isActive:true,
    employeeId:employeeModel._id,
    roles:employeeModel.roles || null,
    departmentId:employeeModel.department || null,
    teamId:employeeModel.team || null,
    subTeamId:employeeModel.subTeam || null
  })
  await user.save();
  return user
};

const signin = async (data) => {
  const { username, password } = data;
  //check if it's owner
  const owner = await ownerModel.findOne({username},"name password role");
  const employee = await employeeModel.findOne({username},"firstname password roles");
  console.log(owner,employee);
  
  if(owner){    
    const isMatchOwner = await bcrypt.compare(password, owner.password);
    if(!isMatchOwner) {throw new AppError("Invalid credentials",400);}
    const token = generateToken({ id: owner._id, name: owner.name, role:owner.role});
    return {token};
  }else if(employee){
    const isMatchEmployee = await bcrypt.compare(password, employee.password);
    if(!isMatchEmployee) throw new AppError("Invalid credentials",400);
    const token = generateToken({ id: employee._id, role: employee.roles, firstname:employee.firstname });
    return {token};
  }else{
    throw new AppError("user not found",400)
  } 
};
export default {signin,signup}