import Joi from "joi";
export const baseSchema ={
    name:   Joi.string().trim().min(2).max(30).empty(["",null]),
    email:  Joi.string().email().empty(["", null]),
    phones: Joi.array().items(Joi.string().pattern(/^\+?[0-9]{7,15}$/))
        .messages({
            "string.pattern.base": "must be a valid Phone",
        }),
    desc:   Joi.string()
        .pattern(/^[\w\s.,!?'"()-]{10,500}$/)
        .messages({
            "string.pattern.base":
            "Description must be 10–500 characters and may include letters, numbers, spaces, and basic punctuation.",
        }),
    ref:    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.pattern.base": "must be a valid reference",
        })
        .allow(null),
    isbool:     Joi.boolean(),
    username:   Joi.string()
        .pattern(/^(?!_)(?!.*__)[a-zA-Z0-9_]{3,20}(?<!_)$/)
        .empty(["", null])
        .messages({
            "string.pattern.base":
            "Username must be 3-20 characters, only letters, numbers, or underscores, and cannot start or end with an underscore.",
        }),
    password:   Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .empty(["", null])
        .messages({
            "string.pattern.base":
            "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
        }),
    date:   Joi.date().iso(),
    price:  Joi.number().min(0).messages({
        "number.base": "Min price must be a number.",
        "number.min": "Min price cannot be negative.",
    }),
    URL: Joi.string().uri({scheme:["http","https"]}),

}