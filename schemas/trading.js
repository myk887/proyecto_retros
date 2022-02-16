const Joi = require('joi')

const trading = Joi.object({
    buy: Joi.string()
        .required()
        .pattern(new RegExp('^[0-1]{1}$'))
        .max(1)
        .messages({
            'string.entry': '[buy] is required',
            'any.required': '[buy] is required',
            'string.pattern': '[buy] error'
    }),
    saleDate: Joi.string()
        .required()
        .pattern(new RegExp('^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$'))
        .messages({
            'string.entry': '[saleDate] is required',
            'any.required': '[saleDate] is required',
            'string.pattern': '[saleDate] error'
    }),
    saleHour: Joi.string()
        .required()
        .pattern(new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'))
        .messages({
            'string.entry': '[saleHour] is required',
            'any.required': '[saleHour] is required',
            'string.pattern': '[saleHour] error'
    })
})

module.exports = trading
