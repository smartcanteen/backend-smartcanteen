const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Seller = require("../../models/seller")
const Food = require("../../models/food")
const Tenant = require("../../models/tenant")

class controller_tenant {
  constructor() {
    this.Seller = Seller
    this.Food = Food
    this.Tenant = Tenant
  }

  async regisTenant(req, res) {
    let payload = req.body
    const { id_penjual, id_warung } = req.user
    let tenant = await this.Tenant.findOne({ where: { nama_warung: payload.nama_warung } })
    if (tenant) {
      return res.sendError(
        {},
        "Warung sudah ada, silahkan gunakan nama warung lainnya",
        401,
      )
    }
    if (!req.user.isSeller) {
      return res.sendError(
        {},
        "Anda bukan seller, silahkan kontak admin untuk lebih lanjut",
        401,
      )
    }
    tenant = await this.Tenant.findByPk(id_warung)
    if (tenant) {
      return res.sendError(
        {},
        "Anda sudah memiliki warung",
        401,
      )
    }
    // console.log(payload)
    const seller = await this.Seller.findByPk(id_penjual)
    console.log(seller.dataValues);
    tenant = new this.Tenant(payload)
    await tenant.save()
    await tenant.setSeller(seller)
    return res.sendResponse(tenant, "Registrasi warung telah berhasil", 201)
  }

  async detailTenant(req, res) {
    const id_warung = req.user.id_warung ? req.user.id_warung : req.params.id
    const tenant = await this.Tenant.findOne({
      where: { id_warung },
      include: [{
        model: this.Seller,
        attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
      },
      {
        model: this.Food,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
      }],
      attributes: { exclude: ["deletedAt", "updatedAt"] },
    })
    if (!tenant) return res.sendError({}, "Warung tidak ditemukan!", 401)
    return res.sendResponse(tenant, "Berikut detail dari warung", 200)
  }

  async getAllTenant(req, res) {
    // console.log("masuk");
    const tenant = await this.Tenant.findAll({
      include: [{
        model: this.Seller,
        attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
      },
      {
        model: this.Food,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
      }],
      attributes: { exclude: ["deletedAt", "updatedAt"] },
    })
    // console.log(seller);
    if (!tenant) return res.sendError({}, "Akun tidak ditemukan!", 401)
    return res.sendResponse(tenant, "Berikut detail dari semua warung", 200)
  }

  async updateTenant(req, res) {
    const id_warung = req.user.id_warung ? req.user.id_warung : req.params.id
    const payload = req.body
    const tenant = await this.Tenant.findByPk(id_warung)
    if (!tenant) return res.sendError({}, "Akun tidak ditemukan!", 401)
    if (req.params.id && !req.user.isAdmin) { return res.sendError({}, "Maaf anda tidak memiliki akses ini", 401) }

    // if (payload.first_name) seller.first_name = payload.first_name
    // if (payload.last_name) seller.last_name = payload.last_name
    // if (payload.email) seller.email = payload.email

    // if (payload.password) seller.password = encryptPass(payload.password)
    // if (payload.no_telp) seller.no_telp = payload.no_telp
    for (const key in payload) {
      tenant[key] = payload[key]
    }
    await tenant.save()
    return res.sendResponse(tenant, "seller sukses diupdate", 200)
  }
}

// module.exports = {
//   loginSeller,
//   regisSeller,
//   detailSeller,
//   getAllSeller,
//   updateSeller
// }

module.exports = controller_tenant
