import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createSubTeamSchema = Joi.object({
    name:baseSchema.name.required(),
    email:baseSchema.email,
    team: baseSchema.ref,
    subLeader: baseSchema.ref,
    mambers: Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifedBy:baseSchema.ref
})

export const updateSubTeamSchema = Joi.object({
    name:baseSchema.name,
    email:baseSchema.email,
    team: baseSchema.ref,
    subLeader: baseSchema.ref,
    mambers: Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifedBy:baseSchema.ref
}).min(1)