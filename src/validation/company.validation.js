import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

const soicalSchema = Joi.object({
    name:Joi.string(),
    link:Joi.string().uri().required()
})

export const createCompanySchema = Joi.object({
    name: baseSchema.name.required(),
    email:baseSchema.email,
    phones:baseSchema.phones,
    address:Joi.string().min(3).max(50),
    social:Joi.array().items(soicalSchema),
    owner:Joi.array().items(baseSchema.ref),
    cmo:baseSchema.ref,
}).options({stripUnknown:true})

export const updateCompanySchema = Joi.object({
    name: baseSchema.name,
    email:baseSchema.email,
    phones:baseSchema.phones,
    social:Joi.array().items(soicalSchema),
    owner:Joi.array().items(baseSchema.ref),
    cmo:baseSchema.ref,
}).min(1).options({stripUnknown:true})
