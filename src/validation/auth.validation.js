import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const signupAuthSchema = Joi.object({
    username:baseSchema.name,
    email:baseSchema.email,
    password:baseSchema.password
}).options({stripUnknown:true})

export const signinAuthSchema = Joi.object({
    username:baseSchema.name,
    password:baseSchema.password
}).options({stripUnknown:true})