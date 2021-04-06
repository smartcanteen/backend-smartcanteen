// const { signUser } = require('../../middleware/auth')
// const { encryptPass, isValid } = require('../../helpers/encrypt')
const Food = require('../../models/food')
const Seller = require('../../models/seller')

class controller_food{
  constructor(){
  }

  async tambahMakanan(req,res) {
    let payload = req.body
    // let food = await Food.findOne({where : {nama: payload.nama} })  
    // if (food) return res.sendError({},'Akun sudah ada, silahkan gunakan email lainnya',401)
    if (!req.user.isSeller) return res.sendError({},'Anda bukan penjual, silahkan kontak admin untuk lebih lanjut',401)
    const {id_penjual} = req.user
    let food = await Food.findOne({ where: {id_penjual, nama:payload.nama}, attributes: { exclude: ['deletedAt','updatedAt'] } })
    if (food) return res.sendError({},'Makanan sudah pernah ditambahkan',401)
    const seller = await Seller.findByPk(id_penjual)
    food = new Food(payload)
    await food.setSeller(seller)
    await food.save()
    return res.sendResponse(food,'Makanan berhasil ditambahkan',201)
  }

  async getAllMakanan(req,res){
    const {id_penjual, isAdmin} = req.user
    // const seller = await Seller.findByPk(id_penjual)
    let food = await Food.findAll({ attributes: { exclude: ['deletedAt','updatedAt'] }, include: { model: Seller, attributes: { exclude: ['password','deletedAt','updatedAt'] } } })
    if (!isAdmin) food = await Food.findAll({ where: {id_penjual}, attributes: { exclude: ['deletedAt','updatedAt'] }, include: { model: Seller, attributes: { exclude: ['password','deletedAt','updatedAt'] } } })
    return res.sendResponse(food,'Makanan berhasil ditambahkan',201)
  }

  async detailMakanan(req,res) {
    const id_makanan = req.params.id
    const food = await Food.findOne({ where: {id_makanan}, attributes: { exclude: ['deletedAt','updatedAt'] }, include: { model: Seller, attributes: { exclude: ['password','deletedAt','updatedAt'] } } })
    if (!food) return res.sendError({},'Makanan tidak ditemukan!',401)
    return res.sendResponse(food,'Sukses Login',200)
  }

  async updateMakanan(req,res) {
    const id_makanan = req.params.id
    const payload = req.body;
    const food = await Food.findOne({ where: {id_makanan}, attributes: { exclude: ['deletedAt','updatedAt'] }, include: { model: Seller, attributes: { exclude: ['password','deletedAt','updatedAt'] } } })
    if (!food) return res.sendError({},'Makanan tidak ditemukan!',401)
    if(!req.user.isAdmin && (food.id_penjual !== req.user.id_penjual)) return res.sendError({},'Maaf anda tidak memiliki akses ini',401)
    for (const key in payload){
      food[key] = payload[key]
    }
    await food.save()
    return res.sendResponse(food,'Makanan berhasil diupdate',200)
  }
}

module.exports = controller_food


// module.exports = {
//   tambahMakanan,
//   detailMakanan
// }