const { signUser } = require('../../middleware/auth')
const { encryptPass, isValid } = require('../../helpers/encrypt')
const Seller = require('../../models/seller')
require('dotenv').config()


async function loginSeller(req,res) {
  console.log('login Seller')
  const payload = req.body
  const seller = await Seller.findOne({where : {email: payload.email} })  
  if (!seller) return res.sendError({},'Akun tidak ditemukan!',401)
  if(isValid(payload.password, seller.password)) {
    let data = {}
    data.isAdmin = false
    data.isSeller = true
    data.id_penjual = seller.id_penjual
    data.first_name = seller.first_name
    data.last_name = seller.last_name
    data.email = seller.email
    const token = signUser(data)
    data.token = token
    return res.sendResponse(data,'Sukses Login',200)
  } else return res.sendError({},'Password salah!',401)
  
}

async function regisSeller(req,res) {
  let payload = req.body
  let seller = await Seller.findOne({where : {email: payload.email} })  
  if (seller) return res.sendError({},'Akun sudah ada, silahkan gunakan email lainnya',401)
  if (!req.user.isAdmin) return res.sendError({},'Anda bukan admin, silahkan kontak admin untuk lebih lanjut',401)
  payload.password = encryptPass(payload.password)
  seller = new Seller(payload)
  await seller.save()
  res.sendResponse(seller,'Registrasi telah berhasil',201)
}

async function detailSeller(req,res) {
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