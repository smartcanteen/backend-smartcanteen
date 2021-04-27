const Sequelize = require("sequelize")
const db = require("../config/database")

const Order_Item = db.define(
  "order_item",
  {
    id_order_item: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    id_order: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    id_makanan: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    catatan: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    total_harga_item: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  },
)

module.exports = Order_Item
