const Joi = require('joi')

const passwordSchema = Joi.object({
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.entry': '[password] is required',
            'any.required': '[password] is required',
            'string.pattern': '[password] error'
    })
})

module.exports = passwordSchema