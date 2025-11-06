import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createTeamSchema = Joi.object({
    name: baseSchema.name.required(),
    email: baseSchema.email,
    department: baseSchema.ref,
    leader: baseSchema.ref,
    members: Joi.array().items(baseSchema.ref),
    subTeams: Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
})

export const updateTeamSchema = Joi.object({
    name: baseSchema.name,
    email: baseSchema.email,
    department: baseSchema.ref,
    leader: baseSchema.ref,
    members: Joi.array().items(baseSchema.ref),
    subTeams: Joi.array().items(baseSchema.ref),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
}).min(1)