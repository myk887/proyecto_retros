const Joi = require('joi')

const usersShema = Joi.object({
    email: Joi.string()
        .required()
        .messages({
            'string.entry': '[email] is required',
            'any.required': '[email] is required'
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
    .max(80)
    .messages({
        'string.entry': '[password] is required',
        'any.required': '[password] is required',
        'string.min': '[password] should be between 3 and 50 characters',
        'string.max': '[password] should be between 3 and 50 characters'
    }),
    avatar: Joi.string()
    .min(3)
    .messages({
        'string.entry': '[password] is required',
        'string.min': '[password] should be between 3 and 50 characters',
        'string.max': '[password] should be between 3 and 50 characters'
    })
})

module.exports = usersShema