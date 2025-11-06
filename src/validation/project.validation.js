import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createProjectSchema = Joi.object({
    name:baseSchema.name.required(),
    desc: baseSchema.desc,
    client:baseSchema.ref.required(),
    department:baseSchema.ref,
    package:baseSchema.ref,
    services:Joi.array().items(baseSchema.ref),
    tasks:Joi.array().items(baseSchema.ref),
    startDate: baseSchema.date.greater("now"),
    endDate: baseSchema.date.greater(Joi.ref("startDate")),
    status:Joi.string().valid('draft','active','completed','cancelled'),
    createdBy:baseSchema.ref,
    modidiedBy: baseSchema.ref
})

export const updateProjectSchema = Joi.object({
    name:baseSchema.name,
    desc: baseSchema.desc,
    client:baseSchema.ref,
    department:baseSchema.ref,
    package:baseSchema.ref,
    services:Joi.array().items(baseSchema.ref),
    tasks:Joi.array().items(baseSchema.ref),
    startDate: baseSchema.date.greater("now"),
    endDate: baseSchema.date.greater(Joi.ref("startDate")),
    status:Joi.string().valid('draft','active','completed','cancelled'),
    modidiedBy: baseSchema.ref
})