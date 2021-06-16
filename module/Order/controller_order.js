const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Seller = require("../../models/seller")
const Buyer = require("../../models/buyer")
const Food = require("../../models/food")
const Tenant = require("../../models/tenant")
const Order_Item = require("../../models/order_item")
const Order = require("../../models/order")

class controller_order {
  async orderMakanan(req, res) {
    const id_pembeli = req.query.id

    let payload = req.body
    // const dummy = `[{"id_makanan":"d25e19d9-3d3b-45ed-8ca8-de4195070b45","nama":"Es Teh Manis","harga":20000,"ketersediaan":true,"id_warung":"11cc180d-6358-4cd3-af5a-937f01f891de","createdAt":"2021-04-27 11:26:39","qty":2,"catatan":"Gapake sambel"},{"id_makanan":"ab3df1e4-3777-4a4b-9d45-ef983a696aac","nama":"Mie Ayam Tek Tek","harga":25000,"ketersediaan":true,"id_warung":"11cc180d-6358-4cd3-af5a-937f01f891de","createdAt":"2021-04-27 12:14:06","qty":2,"catatan":"Gapake sambel"}]`

    const data = JSON.parse(payload.pesanan)
    // const data = JSON.parse(dummy)
    const order = new Order()
    const buyer = await Buyer.findByPk(id_pembeli)
    await order.setBuyer(buyer)
    for (let pesanan of data) {
      console.log(pesanan)
      let data = {
        quantity: pesanan.qty,
        total_harga_item: pesanan.qty * pesanan.harga,
        catatan: pesanan.catatan,
      }
      const orderItem = new Order_Item(data)
      const food = await Food.findByPk(pesanan.id_makanan)
      await orderItem.setFood(food)
      await orderItem.setOrder(order)
      await orderItem.save()
    }

    const fixOrder = await Order.findOne({
      where: { id_order: order.id_order },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: {
        model: Order_Item,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        include: {
          model: Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      },
    })
    return res.sendResponse(fixOrder, "Order Makanan Berhasil", 200)
  }

  async getOrder(req, res) {
    const id_order = req.params.id
    const order = await Order.findOne({
      where: { id_order },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: {
        model: Order_Item,
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        include: {
          model: Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      },
    })
    if (!order) return res.sendError({}, "Order tidak ditemukan", 404)
    return res.sendResponse(order, "Berikut detail ordernya", 200)
  }

  async getOrderByWarung(req, res) {
    const id_warung = req.user.id_warung ? req.user.id_warung : req.params.id
    const order = await Order_Item.findAll({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: [
        {
          model: Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
          where: { id_warung }
        },
        {
          model: Order,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      ],
    })
    if (req.params.id && !req.user.isAdmin) { return res.sendError({}, "Maaf anda tidak memiliki akses ini", 401) }
    if (!order) return res.sendError({}, "Order tidak ditemukan", 404)
    return res.sendResponse(order, "Berikut detail ordernya", 200)
  }

  async updateStatus(req, res) {
    const id_order_item = req.params.id
    const status = req.params.status
    const payload = req.body
    const order = await Order_Item.findOne({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      where: { id_order_item },
      include: [
        {
          model: Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
        {
          model: Order,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
      ],
    })
    if (!order) return res.sendError({}, "Order tidak ditemukan", 404)
    if (status > 4 || status < 0) return res.sendError({}, "Status tidak terdaftar", 404)
    order.status = status 
    await order.save()
    return res.sendResponse(order, "Berhasil update status", 200)
  }

  async statistikAdmin(req, res) {
    const stat = {
      penjualan: 5,
      keuntungan: 100000,
      transaksi: 8,
      pembelian: 8
    }
    return res.sendResponse(stat, "Berikut Statistiknya", 200)
  }
}

// module.exports = {
//   loginSeller,
//   regisSeller,
//   detailSeller,
//   getAllSeller,
//   updateSeller
// }

module.exports = controller_order
