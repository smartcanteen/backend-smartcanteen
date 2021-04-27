const Joi = require("joi")

const registerTenant = Joi.object({
  nama_warung: Joi.string().min(3).required(),
  deskripsi: Joi.string().min(3).required(),
})

const updateTenant = Joi.object({
  nama_warung: Joi.string().min(3),
  deskripsi: Joi.string().min(3),
})

module.exports = {
  registerTenant,
  updateTenant,
}
