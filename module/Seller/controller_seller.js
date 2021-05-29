const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Seller = require("../../models/seller")
const Food = require("../../models/food")
const Tenant = require("../../models/tenant")

class controller_seller {
  async loginSeller(req, res) {
    // console.log("login Seller")
    const payload = req.body
    const seller = await Seller.findOne({
      where: { email: payload.email },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
    })
    if (!seller) return res.sendError({}, "Akun tidak ditemukan!", 401)
    if (isValid(payload.password, seller.password)) {
      const tenant = await Tenant.findOne(
        { 
          where: { id_penjual: seller.id_penjual },
          attributes: { exclude: ["deletedAt", "updatedAt"] },
        })
      console.log(tenant);
      let data = {
        ...seller.dataValues,
        id_warung: tenant?tenant.id_warung:null,
        isAdmin: false,
        isSeller: true,
      }
      delete data.password
      data.token = await signUser(data)
      return res.sendResponse(data, "Sukses Login", 200)
    } else return res.sendError({}, "Password salah!", 401)
  }

  async regisSeller(req, res) {
    let payload = req.body
    let seller = await Seller.findOne({ where: { email: payload.email } })
    if (seller) {
      return res.sendError(
        {},
        "Akun sudah ada, silahkan gunakan email lainnya",
        401,
      )
    }
    if (!req.user.isAdmin) {
      return res.sendError(
        {},
        "Anda bukan admin, silahkan kontak admin untuk lebih lanjut",
        401,
      )
    }
    // console.log(payload)
    payload.password = encryptPass(payload.password)
    seller = new Seller(payload)
    await seller.save()
    return res.sendResponse(seller, "Registrasi telah berhasil", 201)
  }

  async detailSeller(req, res) {
    const id_penjual = req.user.id_penjual ? req.user.id_penjual : req.params.id
    const seller = await Seller.findOne({
      where: { id_penjual },
      include: {
        model: Tenant,
        include: {
          model: Food,
          attributes: { exclude: ["deletedAt", "updatedAt"] },
        },
        attributes: { exclude: ["deletedAt", "updatedAt"] },
      },
      attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
    })
    if (!seller) return res.sendError({}, "Akun tidak ditemukan!", 401)
    if (req.params.id && !req.user.isAdmin) { return res.sendError({}, "MAaf anda tidak memiliki akses ini", 401) } else {
      return res.sendResponse(seller, "Berikut detail dari penjual", 200)
    }
  }

  async getAllSeller(req, res) {
    // console.log("masuk");
    const seller = await Seller.findAll({
      include: {
        model: Tenant,
        include: {
          model: Food,
          attributes: { exclude: ["deletedAt", "updatedAt"] },
        },
        attributes: { exclude: ["deletedAt", "updatedAt"] },
      },
      attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
    })
    // console.log(seller);
    if (!seller) return res.sendError({}, "Akun tidak ditemukan!", 401)
    else if (!req.user.isAdmin) { return res.sendError({}, "Maaf, anda bukan admin", 401) } else {
      return res.sendResponse(seller, "Berikut detail dari semua penjual", 200)
    }
  }

  async updateSeller(req, res) {
    const idSeller = req.user.id_penjual ? req.user.id_penjual : req.params.id
    const payload = req.body
    const seller = await Seller.findByPk(idSeller)
    if (!seller) return res.sendError({}, "Akun tidak ditemukan!", 401)
    if (req.params.id && !req.user.isAdmin) { return res.sendError({}, "Maaf anda tidak memiliki akses ini", 401) }

    // if (payload.first_name) seller.first_name = payload.first_name
    // if (payload.last_name) seller.last_name = payload.last_name
    // if (payload.email) seller.email = payload.email

    // if (payload.password) seller.password = encryptPass(payload.password)
    // if (payload.no_telp) seller.no_telp = payload.no_telp
    for (const key in payload) {
      if (key === "password") seller[key] = encryptPass(payload[key])
      else seller[key] = payload[key]
    }

    await seller.save()
    return res.sendResponse(seller, "Data penjual sukses diupdate", 200)
  }
}

// module.exports = {
//   loginSeller,
//   regisSeller,
//   detailSeller,
//   getAllSeller,
//   updateSeller
// }

module.exports = controller_seller
