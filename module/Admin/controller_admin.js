const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Admin = require("../../models/admin")

class controller_admin {
  constructor() {
    this.Admin = Admin
  }

  async loginAdmin(req, res) {
    // console.log("login Admin")
    const payload = req.body
    const admin = await this.Admin.findOne({ where: { email: payload.email } })
    if (!admin) return res.sendError({}, "Akun tidak ditemukan!", 401)
    if (isValid(payload.password, admin.password)) {
      let data = {
        isAdmin: true,
        id_admin: admin.id_admin,
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
      }
      // data.isAdmin = true
      // data.id_admin = admin.id_admin
      // data.first_name = admin.first_name
      // data.last_name = admin.last_name
      // data.email = admin.email
      const token = signUser(data)
      data.token = token
      return res.sendResponse(data, "Sukses Login", 200)
    } else return res.sendError({}, "Password salah!", 401)
  }

  async regisAdmin(req, res) {
    let payload = req.body
    let admin = await this.Admin.findOne({ where: { email: payload.email } })
    if (admin) {
      return res.sendError(
        {},
        "Akun sudah ada, silahkan gunakan email lainnya",
        401,
      )
    }
    payload.password = encryptPass(payload.password)
    admin = new Admin(payload)
    await admin.save()
    return res.sendResponse(admin, "Registrasi telah berhasil", 201)
  }

  async detailAdmin(req, res) {
    const id = req.user.id_admin
    const admin = await this.Admin.findByPk(id)
    if (!admin) { return res.sendError(res, false, null, "Akun tidak ditemukan!", 401) } else {
      let data = {}
      data.id_admin = admin.id_admin
      data.first_name = admin.first_name
      data.last_name = admin.last_name
      data.email = admin.email
      return res.sendResponse(data, "Detail Admin", 200)
    }
  }
}

// module.exports = {
//   loginAdmin,
//   regisAdmin,
//   detailAdmin
// }

module.exports = controller_admin
