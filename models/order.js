const Sequelize = require('sequelize')
const db = require('../config/database')

const Order = db.define(
    'order',
    {
      id_order: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      id_pembeli : {
        type: Sequelize.UUID,
        allowNull : true
      }
  }
)

module.exports = Order