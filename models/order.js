const Sequelize = require('sequelize')
const db = require('../config/database')

const Order = db.define(
    'order',
    {
      id_order: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pembeli : {
        type : Sequelize.INTEGER,
        allowNull : true
      }
  }
)

module.exports = Order