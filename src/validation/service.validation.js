import Joi from "joi";
import { baseSchema } from "./baseSchema.js";

export const createServiceSchema = Joi.object({
    name: baseSchema.name.required(),
    desc: baseSchema.desc,
    minPrice: baseSchema.price,
    maxPrice: Joi.number().greater(Joi.ref("minPrice")).messages({
        "number.base": "Max price must be a number.",
        "number.greater": "Max price must be greater than min price.",
  }),
  category: baseSchema.name,
  packages:Joi.array().items(baseSchema.ref),
  tasks:Joi.array().items(baseSchema.ref),
  materials: Joi.array().items(baseSchema.ref),
})

export const updateServiceSchema = Joi.object({
    name: baseSchema.name,
    desc: baseSchema.desc,
    minPrice: baseSchema.price,
    maxPrice: Joi.number().greater(Joi.ref("minPrice")).messages({
        "number.base": "Max price must be a number.",
        "number.greater": "Max price must be greater than min price.",
  }),
  category: baseSchema.name,
  packages:Joi.array().items(baseSchema.ref),
  tasks:Joi.array().items(baseSchema.ref),
  materials: Joi.array().items(baseSchema.ref),
}).min(1)