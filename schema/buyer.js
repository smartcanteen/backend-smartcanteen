const Joi = require("joi")

const registerBuyer = Joi.object({
  email: Joi.string().email().message("masukkan email dengan benar").required(),
})

const updateBuyer = Joi.object({
  first_name: Joi.string().min(3),
  last_name: Joi.string().min(3),
  email: Joi.string().email().message("masukkan email dengan benar"),
  no_telp: Joi.string()
    .min(9)
    .message("nomor telepon harus lebih dari 9")
    .max(12)
    .message("nomor telepon tidak boleh lebih dari 12"),
})

module.exports = {
  registerBuyer,
  updateBuyer,
}
