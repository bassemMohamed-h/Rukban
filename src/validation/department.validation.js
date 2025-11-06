import { baseSchema } from "./baseSchema.js"; 
import Joi from "joi";

export const createDepartmentSchema = Joi.object({
    name:baseSchema.name.required(),
    email:baseSchema.email,
    company:baseSchema.ref,
    manger:baseSchema.ref,
    teams:Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
})

export const updateDepartmentSchema = Joi.object({
    name:baseSchema.name,
    email:baseSchema.email,
    company:baseSchema.ref,
    manger:baseSchema.ref,
    teams:Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
}).min(1)