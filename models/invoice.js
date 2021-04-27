const Sequelize = require("sequelize")
const db = require("../config/database")

const Invoice = db.define(
  "invoice",
  {
    id_invoice: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    id_order: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
)

module.exports = Invoice
