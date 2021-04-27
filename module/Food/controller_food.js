// const { signUser } = require('../../middleware/auth')
// const { encryptPass, isValid } = require('../../helpers/encrypt')
const { Op } = require("sequelize");
const Food = require("../../models/food")
const Seller = require("../../models/seller")
const Tenant = require("../../models/tenant")

class controller_food {
  async tambahMakanan(req, res) {
    let payload = req.body
    // let food = await Food.findOne({where : {nama: payload.nama} })
    // if (food) return res.sendError({},'Akun sudah ada, silahkan gunakan email lainnya',401)
    if (!req.user.isSeller) {
      return res.sendError(
        {},
        "Anda bukan penjual, silahkan kontak admin untuk lebih lanjut",
        401,
      )
    }
    const { id_warung } = req.user
    let food = await Food.findOne({
      where: { id_warung, nama: payload.nama },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
    })
    if (food) return res.sendError({}, "Makanan sudah pernah ditambahkan", 401)
    const tenant = await Tenant.findByPk(id_warung)
    food = new Food(payload)
    await food.setTenant(tenant)
    await food.save()
    return res.sendResponse(food, "Makanan berhasil ditambahkan", 201)
  }

  async getAllMakanan(req, res) {
    // const seller = await Seller.findByPk(id_warung)
    let food = await Food.findAll({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: {
        model: Tenant,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        include: {
          model: Seller,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      },
    })
    if (req.query) {
      const { id_warung, nama=" " } = req.query
      if (id_warung){
        food = await Food.findAll({
          where: {
            id_warung,
            nama: {
              [Op.regexp]: nama,
            },
            ketersediaan: true
          },
          attributes: { exclude: ["deletedAt", "updatedAt"] },
          include: {
            model: Tenant,
            attributes: { exclude: ["deletedAt", "updatedAt"] },
            include: {
              model: Seller,
              attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
            },
          },
        })
      }else {
        food = await Food.findAll({
          where: {
            ketersediaan: true,
            nama: {
              [Op.regexp]: nama,
            }
          },
          attributes: { exclude: ["deletedAt", "updatedAt"] },
          include: {
            model: Tenant,
            attributes: { exclude: ["deletedAt", "updatedAt"] },
            include: {
              model: Seller,
              attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
            },
          },
        })
      }
    }
    if (req.user && req.user.isSeller) {
      const id_warung = req.user.id_warung
      food = await Food.findAll({
        where: { id_warung },
        attributes: { exclude: ["deletedAt", "updatedAt"] },
      })
    }
    return res.sendResponse(food, "Berikut detail dari semua makanan", 201)
  }

  async detailMakanan(req, res) {
    const id_makanan = req.params.id
    const food = await Food.findOne({
      where: { id_makanan },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: {
        model: Tenant,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        include: {
          model: Seller,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      },
    })
    if (!food) return res.sendError({}, "Makanan tidak ditemukan!", 401)
    return res.sendResponse(food, "Berikut detail dari makanan", 200)
  }

  async updateMakanan(req, res) {
    const id_makanan = req.params.id
    const payload = req.body
    const food = await Food.findOne({
      where: { id_makanan },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: {
        model: Tenant,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        include: {
          model: Seller,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      },
    })
    if (!food) return res.sendError({}, "Makanan tidak ditemukan!", 401)
    if (!req.user.isAdmin && food.id_penjual !== req.user.id_penjual) { return res.sendError({}, "Maaf anda tidak memiliki akses ini", 401) }
    for (const key in payload) {
      food[key] = payload[key]
    }
    await food.save()
    return res.sendResponse(food, "Makanan berhasil diupdate", 200)
  }
}

module.exports = controller_food

// module.exports = {
//   tambahMakanan,
//   detailMakanan
// }
