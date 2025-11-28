import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createTeamSchema = Joi.object({
    name: baseSchema.name.required(),
    email: baseSchema.email.required(),
    departmentId: baseSchema.ref.required(),
    leader: baseSchema.ref,
    members: Joi.array().items(baseSchema.ref),
}).options({stripUnknown:true})

export const updateTeamSchema = Joi.object({
    name: baseSchema.name,
    email: baseSchema.email,
    departmentId: baseSchema.ref,
    leader: baseSchema.ref,
    members: Joi.array().items(baseSchema.ref),
}).min(1).options({stripUnknown:true})