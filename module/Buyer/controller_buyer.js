const { signUser } = require("../../middleware/auth")
const { encryptPass, isValid } = require("../../helpers/encrypt")
const Buyer = require("../../models/buyer")
// const Food = require("../../models/food")
// const Tenant = require("../../models/tenant")
// const Order_Item = require("../../models/order_item")
// const Order = require("../../models/order")

class controller_order {
  constructor() {
    this.Buyer = Buyer
  }

  async regisBuyer(req, res) {
    let payload = req.body
    let buyer = await this.Buyer.findOne({ where: { email: payload.email } })
    if (!buyer) {
      // console.log(payload)
      buyer = new this.Buyer(payload)
      await buyer.save()
      return res.sendResponse({...buyer.dataValues, new: true}, "Berikut data pembeli baru", 201)
    }else{
      return res.sendResponse({...buyer.dataValues, new: false}, "Berikut data pembeli", 201)
    }
    
  }

  async updateBuyer(req, res) {
    const id_pembeli = req.params.id
    const payload = req.body
    const buyer = await this.Buyer.findByPk(id_pembeli)
    if (!buyer) return res.sendError({}, "Akun tidak ditemukan!", 401)
    for (const key in payload) {
      buyer[key] = payload[key]
    }

    await buyer.save()
    return res.sendResponse(buyer, "Data penjual sukses diupdate", 200)
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
