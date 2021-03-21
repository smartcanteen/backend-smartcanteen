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
  res.sendResponse(food,'Makanan berhasil ditambahkan',201)
}

async function detailMakanan(req,res) {
  const id = req.params.id
  const food = await Food.findByPk(id)
  if (!food) return res.sendError({},'Makanan tidak ditemukan!',401)
  else {
    let data = 
    res.sendResponse(data,'Sukses Login',200)
  }
}

module.exports = {
  tambahMakanan,
  detailMakanan
}