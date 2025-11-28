import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createPackageSchema = Joi.object({
    name: baseSchema.name.required(),
    desc: baseSchema.desc,
    services:Joi.array().items(baseSchema.ref),
})

export const updatePackageSchema = Joi.object({
    name: baseSchema.name,
    desc: baseSchema.desc,
    services:Joi.array().items(baseSchema.ref),
}).min(1)