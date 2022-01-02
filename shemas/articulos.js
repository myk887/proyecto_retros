const Joi = require('joi')

const entryShema = Joi.object({
    place: Joi.string()
        .required()
        .min(3)
        .max(30)
        .messages({
            'any.required': '[place] is required',
            'string.entry': '[place] is required',
            'string.min': '[place] should be between 3 and 50 characters',
            'string.max': '[place] should be between 3 and 50 characters'
    }),
    description: Joi.string()
        .required()
        .min(20)
        .max(500)
        .messages({
            'string.entry': '[place] is required',
            'any.required': '[place] is required',
            'string.min': '[place] should be between 3 and 50 characters',
            'string.max': '[place] should be between 3 and 50 characters'
    })
})

module.exports = entryShema