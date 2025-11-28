import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

// 🔸 Actions schema (matches actionsSchema in Mongoose)
const actionsValidation = Joi.object({
  manage:       Joi.boolean().default(false),
  update:       Joi.boolean().default(false),
  display:      Joi.boolean().default(false),
  manageOne:    Joi.boolean().default(false),
  updateOne:    Joi.boolean().default(false),
  displayOne:   Joi.boolean().default(false)
});

// 🔸 Permissions schema (matches your permissions object)
const permissionsValidation = Joi.object({
    departments:    actionsValidation,
    teams:          actionsValidation,
    subTeams:       actionsValidation,
    tasks:          actionsValidation,
    services:       actionsValidation,
    materials:      actionsValidation,
    suppliers:      actionsValidation,
    packages:       actionsValidation,
    projects:       actionsValidation,
    clients:        actionsValidation,
    employees:      actionsValidation,
    users:          actionsValidation,
    roles:          actionsValidation,
});
export const createRoleSchema = Joi.object({
    name:baseSchema.name.required(),
    desc: baseSchema.desc,
    permissions:permissionsValidation,
    restrictedTo:Joi.string().
        valid("organization", "department", "team", "subTeam","user").default("user"),
    restrictedDepartment:baseSchema.ref,
    createdBy: baseSchema.ref,
    isActive: baseSchema.isbool
}).options({stripUnknown:true})

export const updateRoleSchema = Joi.object({
    name:baseSchema.name,
    desc: baseSchema.desc,
    permissions:permissionsValidation,
    restrictedTo:Joi.string().valid("organization", "department", "team", "subTeam").default("subTeam"),
    restrictedDepartment:baseSchema.ref,
    modifiedBy: baseSchema.ref,
    isActive: baseSchema.isbool
}).min(1).options({stripUnknown:true})