import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createSubTeamSchema = Joi.object({
    name:baseSchema.name.required(),
    email:baseSchema.email.required(),
    teamId: baseSchema.ref.required(),
    departmentId:baseSchema.ref.required(),
    subLeader: baseSchema.ref,
    mambers: Joi.array().items(baseSchema.ref),
}).options({stripUnknown:true})

export const updateSubTeamSchema = Joi.object({
    name:baseSchema.name,
    email:baseSchema.email,
    teamId: baseSchema.ref,
    departmentId:baseSchema.ref,
    subLeader: baseSchema.ref,
    mambers: Joi.array().items(baseSchema.ref),
}).min(1).options({stripUnknown:true})