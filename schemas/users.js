const Joi = require('joi')

const usersShema = Joi.object({
    email: Joi.string()
        .required()
        .messages({
            'string.entry': '[email] is required',
            'any.required': '[email] is required'
    }),
    location: Joi.string()
        .required()
        .messages({
            'string.entry': '[location] is required',
            'any.required': '[location] is required'
    }),
    province: Joi.string()
        .required()
        .messages({
            'string.entry': '[province] is required',
            'any.required': '[province] is required'
    }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.entry': '[password] is required',
            'any.required': '[password] is required',
            'string.pattern': '[password] error'
    }),
    username: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'string.entry': '[username] is required',
            'any.required': '[username] is required',
            'string.min': '[username] should be between 3 and 50 characters',
            'string.max': '[username] should be between 3 and 50 characters'
        }),
    avatar: Joi.string()
        .min(3)
        .messages({
            'string.entry': '[avatar] is required',
            'string.min': '[avatar] should be more than 3 characters'
        })
})

module.exports = usersShema