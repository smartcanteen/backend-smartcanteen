// const Organizations = require("../models/organisasi")
// const Admin = require("../models/Admin")
// const Organizations_Admin = require("../models/organisasi_admin")
// const Item = require("../models/items")
// const Logs = require("../models/log")
// const Peminjaman = require("../models/peminjaman")
// const User = require("../models/users")
// const Category = require("../models/category")
const Buyer = require("../models/buyer")
const Seller = require("../models/seller")
const Food = require("../models/food")
const Order_Item = require("../models/order_item")
const Order = require("../models/order")
const Table = require("../models/table")

// Organizations.belongsToMany(Admin, {through: Organizations_Admin})
// Admin.belongsToMany(Organizations, {through: Organizations_Admin})

Food.belongsTo(Seller, { foreignKey: 'id_penjual' })
Seller.hasMany(Food, { foreignKey: 'id_penjual' })

Order.belongsTo(Buyer, { foreignKey: 'id_pembeli' })
Buyer.hasMany(Order, { foreignKey: 'id_pembeli' })

Order_Item.belongsTo(Order, { foreignKey: 'id_order' })
Order.hasMany(Order_Item, { foreignKey: 'id_order' })

Order_Item.belongsTo(Food, { foreignKey: 'id_makanan' })
Food.hasMany(Order_Item, { foreignKey: 'id_makanan' })

Buyer.belongsTo(Table, { foreignKey: 'id_meja' })
Table.hasMany(Buyer, { foreignKey: 'id_meja' })

// Logs.belongsTo(Item, { foreignKey: 'id_barang' })
// Item.hasMany(Logs, { foreignKey: 'id_barang' })

// Peminjaman.belongsTo(Item, { foreignKey: 'id_barang' })
// Item.hasMany(Peminjaman, { foreignKey: 'id_barang'})

// Peminjaman.belongsTo(Admin, { foreignKey: 'id_admin' })
// Admin.hasMany(Peminjaman, { foreignKey: 'id_admin' })

// Peminjaman.belongsTo(User, { foreignKey: 'id_user' })
// User.hasMany(Peminjaman, { foreignKey: 'id_user' })

// Item.belongsTo(Category, { foreignKey: 'id_kategori' })
// Category.hasMany(Item, { foreignKey: 'id_kategori' })
