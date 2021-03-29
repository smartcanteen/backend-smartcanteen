const Joi = require('joi')

const tambahMakanan = Joi.object({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    no_telp : Joi.string().min(9).message('nomor telepon harus lebih dari 9').max(12).message('nomor telepon tidak boleh lebih dari 12').required(),
    password : Joi.string().required().min(6),
})

module.exports = {
    loginSeller,
    registerSeller
}