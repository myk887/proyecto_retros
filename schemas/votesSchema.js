const Joi = require('joi')

const votesSchema = Joi.object({
    vote: Joi.string()
        .required()
        .pattern(new RegExp('^[0-5]{1}$'))
        .messages({
            'string.entry': '[vote] is required',
            'any.required': '[vote] is required',
            'string.pattern': '[vote] error'
    })
})

module.exports = votesSchema