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
    for (let pesanan of data){
      console.log(pesanan);
      let data = {
        quantity: pesanan.qty,
        total_harga_item: pesanan.qty*pesanan.harga,
        catatan: pesanan.catatan
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

  async getOrder(req, res){
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
}

// module.exports = {
//   loginSeller,
//   regisSeller,
//   detailSeller,
//   getAllSeller,
//   updateSeller
// }

module.exports = controller_order
