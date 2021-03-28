const Joi = require('joi')

const tambahMakanan = Joi.object({
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