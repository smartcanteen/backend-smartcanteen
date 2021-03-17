// const { signUser } = require('../../middleware/auth')
// const { encryptPass, isValid } = require('../../helpers/encrypt')
const Food = require('../../models/food')
require('dotenv').config()

async function tambahMakanan(req,res) {
  let payload = req.body
  let food = await Food.findOne({where : {nama: payload.nama} })  
  if (food) return res.sendError({},'Akun sudah ada, silahkan gunakan email lainnya',401)
  if (!req.user.isSeller) return res.sendError({},'Anda bukan penjual, silahkan kontak admin untuk lebih lanjut',401)
  food = new Food(payload)
  await food.save()
  res.sendResponse(food,'Registrasi telah berhasil',201)
}

async function detailMakanan(req,res) {
  const id = req.user.id_penjual
  const seller = await Seller.findByPk(id)
  if (!seller) return res.sendError({},'Akun tidak ditemukan!',401)
  else {
    let data = {}
    data.id_penjual = seller.id_penjual
    data.first_name = seller.first_name
    data.last_name = seller.last_name
    data.email = seller.email
    res.sendResponse(data,'Sukses Login',200)
  }
}

module.exports = {
  loginSeller,
  regisSeller,
  detailSeller
}