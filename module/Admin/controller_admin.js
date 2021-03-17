const { signUser } = require('../../middleware/auth')
const { encryptPass, isValid } = require('../../helpers/encrypt')
const Admin = require('../../models/admin')
require('dotenv').config()


async function loginAdmin(req,res) {
  console.log('login Admin')
  const payload = req.body
  const admin = await Admin.findOne({where : {email: payload.email} })  
  if (!admin) return res.sendError({},'Akun tidak ditemukan!',401)
  if(isValid(payload.password, admin.password)) {
    let data = {}
    data.isAdmin = true
    data.id_admin = admin.id_admin
    data.first_name = admin.first_name
    data.last_name = admin.last_name
    data.email = admin.email
    const token = signUser(data)
    data.token = token
    return res.sendResponse(data,'Sukses Login',200)
  } else return res.sendError({},'Password salah!',401)
  
}

async function regisAdmin(req,res) {
  let payload = req.body
  let admin = await Admin.findOne({where : {email: payload.email} })  
  if (admin) return res.sendError({},'Akun sudah ada, silahkan gunakan email lainnya',401)
  payload.password = encryptPass(payload.password)
  admin = new Admin(payload)
  await admin.save()
  res.sendResponse(admin,'Registrasi telah berhasil',201)
}

async function detailAdmin(req,res) {
  const id = req.user.id_admin
  const admin = await Admin.findByPk(id)
  if (!admin) return res.sendError(res,false,null,'Akun tidak ditemukan!',401)
  else {
    let data = {}
    data.id_admin = admin.id_admin
    data.first_name = admin.first_name
    data.last_name = admin.last_name
    data.email = admin.email
    res.sendResponse(data,'Sukses Login',200)
  }
}

module.exports = {
  loginAdmin,
  regisAdmin,
  detailAdmin
}