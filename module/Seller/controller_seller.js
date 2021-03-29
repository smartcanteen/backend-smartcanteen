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
  const id = req.params.id?req.params.id:req.user.id_penjual
  const seller = await Seller.findByPk(id)
  if (!seller) return res.sendError({},'Akun tidak ditemukan!',401)
  if(req.params.id && !req.user.isAdmin) return res.sendError({},'MAaf anda tidak memiliki akses ini',401)
  else {
    let data = {}
    data.id_penjual = seller.id_penjual
    data.first_name = seller.first_name
    data.last_name = seller.last_name
    data.email = seller.email
    res.sendResponse(data,'Berikut detail dari penjual',200)
  }
}

async function getAllSeller(req,res) {
  // console.log("masuk");
  const seller = await Seller.findAll({
    attributes: { exclude: ['password','deletedAt','updatedAt'] }
  })
  // console.log(seller);
  if (!seller) return res.sendError({},'Akun tidak ditemukan!',401)
  else if (!req.user.isAdmin) return res.sendError({},'Maaf, anda bukan admin',401)
  else {
    res.sendResponse(seller,'Sukses Login',200)
  }
}

async function updateSeller(req,res) {
  const idSeller = req.params.id
  const payload = req.body;
  const seller = await Seller.findByPk(idSeller)
  if (!seller) return response(res,false,null,'Akun penjual tidak ditemukan',401)
  if (payload.first_name) seller.first_name = payload.first_name
  if (payload.last_name) seller.last_name = payload.last_name
  if (payload.email) seller.email = payload.email

  if (payload.password) seller.password = encryptPass(payload.password)
  if (payload.no_telp) seller.no_telp = payload.no_telp

  await seller.save()
  return response(res,true, seller,'seller sukses diupdate',200)
}

module.exports = {
  loginSeller,
  regisSeller,
  detailSeller,
  getAllSeller,
  updateSeller
}