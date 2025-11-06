import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createTaskSchema = Joi.object({
    title:baseSchema.name.required(),
    desc: baseSchema.desc,
    assignedTo: baseSchema.ref,
    status: Joi.string().valid("todo","in-progress","done").messages({
        "string.pattern.base":"must choose correct status"
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.pattern.base":"must choose correct priority"
    }),
    dueDate:baseSchema.date.greater("now"),
    startDate:baseSchema.date.greater("now"),
    completedAt:baseSchema.date.greater("now"),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
})

export const updateTaskSchema = Joi.object({
    title:baseSchema.name,
    desc: baseSchema.desc,
    assignedTo: baseSchema.ref,
    status: Joi.string().valid("todo","in-progress","done").messages({
        "string.pattern.base":"must choose correct status"
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.pattern.base":"must choose correct priority"
    }),
    dueDate:baseSchema.date.greater("now"),
    startDate:baseSchema.date.greater("now"),
    completedAt:baseSchema.date.greater("now"),
    createdBy:baseSchema.ref,
    modifiedBy:baseSchema.ref
})