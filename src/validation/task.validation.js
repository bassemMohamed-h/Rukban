import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createTaskSchema = Joi.object({
    title:baseSchema.name.required(),
    desc: baseSchema.desc,
    taskLink: baseSchema.URL,
    assignedTo: baseSchema.ref,
    serviceId: baseSchema.ref.required(),
    packageId: baseSchema.ref.required(),
    projectId: baseSchema.ref.required(),

    status: Joi.string().valid("todo","in-progress","done").messages({
        "string.pattern.base":"must choose correct status"
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.pattern.base":"must choose correct priority"
    }),
    dueDate:baseSchema.date.greater("now"),
    startDate:baseSchema.date.greater("now"),
    completedAt:baseSchema.date.greater("now"),
})

export const updateTaskSchema = Joi.object({
    title:baseSchema.name,
    desc: baseSchema.desc,
    taskLink:  baseSchema.URL,
    assignedTo: baseSchema.ref,
    serviceId: baseSchema.ref,
    packageId: baseSchema.ref,
    projectId: baseSchema.ref,
    status: Joi.string().valid("todo","in-progress","done").messages({
        "string.pattern.base":"must choose correct status"
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.pattern.base":"must choose correct priority"
    }),
    dueDate:baseSchema.date.greater("now"),
    startDate:baseSchema.date.greater("now"),
    completedAt:baseSchema.date.greater("now"),
}).min(1)