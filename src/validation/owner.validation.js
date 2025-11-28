import joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createOwnerSchema = joi.object({
    name:baseSchema.name.required(),
    email:baseSchema.email,
    phones:baseSchema.phones,
    role:joi.string().valid("owner"),
    username:baseSchema.username,
    password:baseSchema.password,
}).options({stripUnknown:true})

export const updateOwnerSchema = joi.object({
    name:baseSchema.name,
    email:baseSchema.email,
    phones:baseSchema.phones,
    role:joi.string().valid("owner"),
    username:baseSchema.username,
    password:baseSchema.password,
}).min(1).options({stripUnknown:true})