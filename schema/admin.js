const Joi = require("joi")

const loginAdmin = Joi.object({
  email: Joi.string().email().message("masukkan email dengan benar").required(),
  password: Joi.string()
    .min(6)
    .message("password minimal 6 karakter")
    .pattern(
      new RegExp(
        "^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$|admin)",
      ),
    )
    .message(
      "Silahkan gunakan kombinasi karakter besar kecil, angka dan symbol",
    )
    .required(),
})

const registerAdmin = Joi.object({
  first_name: Joi.string()
    .min(3)
    .message("masukkan nama minimal 3 huruf")
    .required(),
  last_name: Joi.string()
    .min(3)
    .message("masukkan nama minimal 3 huruf")
    .required(),
  email: Joi.string().email().message("masukkan email dengan benar").required(),
  no_telp: Joi.string()
    .min(9)
    .message("nomor telepon harus lebih dari 9")
    .max(12)
    .message("nomor telepon tidak boleh lebih dari 12")
    .required(),
  password: Joi.string()
    .min(6)
    .message("password minimal 6 karakter")
    .pattern(
      new RegExp(
        "^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$|admin)",
      ),
    )
    .message(
      "Silahkan gunakan kombinasi karakter besar kecil, angka dan symbol",
    )
    .required(),
})

module.exports = {
  loginAdmin,
  registerAdmin,
}
