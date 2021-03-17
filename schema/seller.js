const Joi = require('joi')

const loginSeller = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerSeller = Joi.object().keys({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    no_telp : Joi.string().min(9).required(),
    password : Joi.string().required().min(6),
})

module.exports = {
    loginSeller,
    registerSeller
}