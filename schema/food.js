const Joi = require("joi")

const tambahMakanan = Joi.object({
  nama: Joi.string().min(3).required(),
  harga: Joi.string().min(3).required(),
  kategori: Joi.string().required(),
  ketersediaan: Joi.string()
    .pattern(new RegExp("((?=.{4}$)true|(?=.{5}$)false)"))
    .message("masukkan true atau false")
    .required(),
})

const updateMakanan = Joi.object({
  nama: Joi.string().min(3),
  harga: Joi.string().min(3),
  kategori: Joi.string(),
  ketersediaan: Joi.string()
    .pattern(new RegExp("((?=.{4}$)true|(?=.{5}$)false)"))
    .message("masukkan true atau false"),
})

module.exports = {
  tambahMakanan,
  updateMakanan,
}
