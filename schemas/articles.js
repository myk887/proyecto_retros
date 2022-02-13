const Joi = require('joi')

const entryShema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .messages({
            'any.required': '[name] is required',
            'string.entry': '[name] is required',
            'string.min': '[name] should be between 3 and 30 characters',
            'string.max': '[name] should be between 3 and 30 characters'
    }),
    description: Joi.string()
        .required()
        .min(10)
        .max(500)
        .messages({
            'string.entry': '[description] is required',
            'any.required': '[description] is required',
            'string.min': '[description] should be between 10 and 500 characters',
            'string.max': '[description] should be between 10 and 500 characters'
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
    category: Joi.string()
        .valid('moviles','fijos','cintas','vinilos','accesorios','monitores','ordenadores','teclados','camaraFotos','camaraVideos','televisores','cartuchos','consolas','cables','despertadores','gps','librosElectronicos', 'maquinasEscribir', 'tdt', 'altavoces', 'mp3', 'radios', 'tocadiscos', 'walkman')
        .required()
        .min(3)
        .max(500)
        .messages({
            'string.entry': '[category] is required',
            'any.required': '[category] is required',
            'string.min': '[category] should be between 3 and 500 characters',
            'string.max': '[category] should be between 3 and 500 characters'
    }),
    photo: Joi.string()
        .required()
        .min(10)
        .max(500)
        .messages({
            'string.entry': '[photo] is required',
            'any.required': '[photo] is required',
            'string.min': '[photo] should be between 10 and 500 characters',
            'string.max': '[photo] should be between 10 and 500 characters'
    }),
    price: Joi
    .required()
    .messages({
        'any.required': '[price] is required'
})
})

module.exports = entryShema