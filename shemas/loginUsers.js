const Joi = require('joi')

const loginShema = Joi.object({
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
    })
})

module.exports = loginShema