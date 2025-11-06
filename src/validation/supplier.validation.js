import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createSupplierSchema = Joi.object({
    name: baseSchema.name.required(),
    phones:baseSchema.phones,
    department:baseSchema.ref,
    materials:Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
})

export const updateSupplierSchema = Joi.object({
    name: baseSchema.name,
    phones:baseSchema.phones,
    department:baseSchema.ref,
    materials:Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
}).min(1)