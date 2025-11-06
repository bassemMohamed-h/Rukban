import bcrypt from "bcryptjs";
import Employee from "../models/employeeModel.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import ownerModel from "../models/ownerModel.js";

const signup = async (data) => {
  const { email, username, password } = data;
  //check if it's owner
  const isowner = await ownerModel.findOne({email},"isActive")
  if(isowner){
    if(isowner.isActive) throw new AppError("user already active try to signin",400)
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const owner = await ownerModel.findOneAndUpdate({email},{
      username,
      password:hashedPassword,
      isActive:true
    },{new:true,runValidators:true})
    return owner
  }
  
  
  // check if username active
  const existingUser = await Employee.findOne({ email },"isActive");
  console.log(existingUser);
  
  if (existingUser.isActive) throw new AppError ("User already Active",400);

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const employee = await Employee.findOneAndUpdate({email},{
    username,
    password: hashedPassword,
  },{new:true,runValidators:true});
  if(!employee) throw new AppError("the email doesn't exist please contact admin",400)
  
  return { employee};
};

const signin = async (data) => {
  const { userName, password } = data;
   //validateSchemaKeys(Employee.schema,data);
  const employee = await Employee.findOne({ userName });
  if (!employee) throw new AppError("User not found",400);
  console.log(employee.title);
  
  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) throw new AppError("Invalid credentials",400);

  const token = generateToken({ id: employee._id, role: employee.roles });

  return {token };
};
export default {signin,signup}