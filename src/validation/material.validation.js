import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createMaterialSchema = Joi.object({
    name:baseSchema.name.required(),
    desc: baseSchema.desc,
    supplier: baseSchema.ref,
    services: Joi.array().items(baseSchema.ref),
})

export const updateMaterialSchema = Joi.object({
    name:baseSchema.name,
    desc: baseSchema.desc,
    supplier: baseSchema.ref,
    services: Joi.array().items(baseSchema.ref),
}).min(1)