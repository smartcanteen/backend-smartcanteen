const Joi = require('joi')

const loginSeller = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerSeller = Joi.object({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    email : Joi.string().email().message('masukkan email dengan benar').required(),
    no_telp : Joi.string().min(9).message('nomor telepon harus lebih dari 9').max(12).message('nomor telepon tidak boleh lebih dari 12').required(),
    password : Joi.string().required().min(6),
})

const updateSeller = Joi.object({
    first_name : Joi.string().min(3),
    last_name : Joi.string().min(3),
    email : Joi.string().email().message('masukkan email dengan benar'),
    no_telp :Joi.string().min(9).message('nomor telepon harus lebih dari 9').max(12).message('nomor telepon tidak boleh lebih dari 12'),
    password : Joi.string().min(6),
})

module.exports = {
    loginSeller,
    registerSeller,
    updateSeller
}