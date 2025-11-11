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
    department: baseSchema.ref,
    team: baseSchema.ref,
    subTeam: baseSchema.ref,
    createdBy: baseSchema.ref,
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
    department: baseSchema.ref,
    team: baseSchema.ref,
    subTeam: baseSchema.ref,
    modifiedBy: baseSchema.ref,
    username: baseSchema.username,
    password: baseSchema.password,
    salary: baseSchema.price
}).min(1)