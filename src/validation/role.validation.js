import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createRoleSchema = Joi.object({
    name:baseSchema.name.required(),
    desc: baseSchema.desc,
    permissions:Joi.array().items(baseSchema.name),
    createdBy: baseSchema.ref,
    modifiedBy: baseSchema.ref,
    isActive: baseSchema.isbool
})

export const updateRoleSchema = Joi.object({
    name:baseSchema.name,
    desc: baseSchema.desc,
    permissions:Joi.array().items(baseSchema.name),
    createdBy: baseSchema.ref,
    modifiedBy: baseSchema.ref,
    isActive: baseSchema.isbool
}).min(1)