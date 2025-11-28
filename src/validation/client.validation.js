import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createClientSchema = Joi.object({
    name : baseSchema.name.required(),
    phones:baseSchema.phones.required(),
    email:baseSchema.email.required(),
    companyName:baseSchema.name,
    companyCategory:Joi.string().valid("small","medium","large"),
    companyAddress:baseSchema.desc,
    companyPhones:baseSchema.phones,
    projects:Joi.array().items(baseSchema.ref),
    isActive:baseSchema.ref,
})

export const updateClientSchema = Joi.object({
    name : baseSchema.name,
    phones:baseSchema.phones,
    email:baseSchema.email,
    companyName:baseSchema.name,
    companyCategory:Joi.string().valid("small","medium","large"),
    companyAddress:baseSchema.desc,
    companyPhones:baseSchema.phones,
    projects:Joi.array().items(baseSchema.ref),


}).min(1)