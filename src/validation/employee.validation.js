import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createEmployeeSchema = Joi.object({
    firstname : baseSchema.name.required(),
    lastname: baseSchema.name.required(),
    title: baseSchema.name.required(),
    email:baseSchema.email,
    phones:baseSchema.phones,
    address:baseSchema.desc,
    company: baseSchema.ref,
    departmentId: baseSchema.ref,
    teamId: baseSchema.ref,
    subTeamId: baseSchema.ref,
    salary: baseSchema.price
})

export const updateEmployeeSchema = Joi.object({
    firstname : baseSchema.name,
    lastname: baseSchema.name,
    title: baseSchema.name,
    email:baseSchema.email,
    phones:baseSchema.phones,
    address:baseSchema.desc,
    company: baseSchema.ref,
    departmentId: baseSchema.ref,
    teamId: baseSchema.ref,
    subTeamId: baseSchema.ref,
    salary: baseSchema.price
}).min(1)