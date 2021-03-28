const Sequelize = require('sequelize')
const db = require('../config/database')

const Payment = db.define(
  'payment',
  {
    id_payment: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    id_invoice : {
      type: Sequelize.UUID,
      allowNull : true
    },
    jumlah_pembayaran : {
      type : Sequelize.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true,
  }
)

module.exports = Payment