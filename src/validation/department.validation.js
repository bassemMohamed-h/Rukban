import { baseSchema } from "./baseSchema.js"; 
import Joi from "joi";

export const createDepartmentSchema = Joi.object({
    name:baseSchema.name.required(),
    email:baseSchema.email,
    mangerId:baseSchema.ref,
}).options({stripUnknown:true})

export const updateDepartmentSchema = Joi.object({
    name:baseSchema.name,
    email:baseSchema.email,
    mangerId:baseSchema.ref,
}).min(1).options({stripUnknown:true})