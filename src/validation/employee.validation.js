import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createEmployeeSchema = Joi.object({
    firstname : baseSchema.name.required(),
    lastName: baseSchema.name.required(),
    title: baseSchema.name,
    email:baseSchema.email,
    phones:baseSchema.phones,
    address:baseSchema.name,
    roles:baseSchema.ref,
    company: baseSchema.ref,
    department: baseSchema.ref,
    team: baseSchema.ref,
    subTeam: baseSchema.ref,
    createdBy: baseSchema.ref,
})

export const updateEmployeeSchema = Joi.object({
    firstname : baseSchema.name,
    lastName: baseSchema.name,
    title: baseSchema.name,
    email:baseSchema.email,
    phones:baseSchema.phones,
    address:baseSchema.name,
    roles:baseSchema.ref,
    company: baseSchema.ref,
    department: baseSchema.ref,
    team: baseSchema.ref,
    subTeam: baseSchema.ref,
    modifiedBy: baseSchema.ref,
    username: baseSchema.username,
    password: baseSchema.password
}).min(1)