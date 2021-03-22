const Joi = require('joi')

const loginSeller = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerSeller = Joi.object().keys({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    email : Joi.string().email().required().error((errors) => new Error('email tidak tepat')),
    no_telp : Joi.string().min(9).required().error((errors) => new Error('silahkan masukkan notelp dengan benar')),
    password : Joi.string().required().min(6).error((errors) => new Error('Silahkan gunakan kombinasi caps dan angka')),
})

module.exports = {
    loginSeller,
    registerSeller
}