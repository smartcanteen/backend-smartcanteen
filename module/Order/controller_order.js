const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Seller = require("../../models/seller")
const Buyer = require("../../models/buyer")
const Food = require("../../models/food")
const Tenant = require("../../models/tenant")
const Order_Item = require("../../models/order_item")
const Order = require("../../models/order")

class controller_order {
  constructor() {
    this.Buyer = Buyer
    this.Food = Food
    this.Order_Item = Order_Item
    this.Order = Order
  }

  async orderMakanan(req, res) {
    const id_pembeli = req.query.id

    let payload = req.body
    const data = JSON.parse(payload.pesanan)
    const order = new this.Order()
    const buyer = await this.Buyer.findByPk(id_pembeli)
    await order.setBuyer(buyer)
    for (let pesanan of data) {
      console.log(pesanan)
      let data = {
        quantity: pesanan.qty,
        total_harga_item: pesanan.qty * pesanan.harga,
        catatan: pesanan.catatan,
      }
      const orderItem = new this.Order_Item(data)
      const food = await this.Food.findByPk(pesanan.id_makanan)
      await orderItem.setFood(food)
      await orderItem.setOrder(order)
      await orderItem.save()
    }

    const fixOrder = await this.Order.findOne({
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
    const order = await this.Order.findOne({
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
    const order = await this.Order_Item.findAll({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      include: [
        {
          model: this.Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
          where: { id_warung }
        },
        {
          model: this.Order,
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
    const order = await this.Order_Item.findOne({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      where: { id_order_item },
      include: [
        {
          model: this.Food,
          attributes: { exclude: ["password", "deletedAt", "updatedAt"] },
        },
        {
          model: this.Order,
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
}

// module.exports = {
//   loginSeller,
//   regisSeller,
//   detailSeller,
//   getAllSeller,
//   updateSeller
// }

module.exports = controller_order
