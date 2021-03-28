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
const Invoice = require("../models/invoice")
const Payment = require("../models/payment")
const Admin = require("../models/admin")

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

Invoice.belongsTo(Order, { foreignKey: 'id_order' })
Order.hasMany(Invoice, { foreignKey: 'id_order' })

Payment.belongsTo(Invoice, { foreignKey: 'id_invoice' })
Invoice.hasMany(Payment, { foreignKey: 'id_invoice' })
