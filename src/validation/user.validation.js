import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createUserSchema = Joi.object({
    username:baseSchema.name.required(),
    email:baseSchema.email.required(),
    password:baseSchema.password().required(),
    roles:Joi.array().items(baseSchema.ref),
    employeeId:baseSchema.ref,
    departmentId:baseSchema.ref,
    teamId:baseSchema.ref,
    subTeamId:baseSchema.ref,
})

export const updateUserSchema = Joi.object({
    username:baseSchema.name,
    email:baseSchema.email,
    password:baseSchema.password(),
    roles:Joi.array().items(baseSchema.ref),
    employee:baseSchema.ref,
    departmentId:baseSchema.ref,
    teamId:baseSchema.ref,
    subTeamId:baseSchema.ref,
}).min(1)