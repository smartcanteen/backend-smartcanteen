const Sequelize = require('sequelize')
const db = require('../config/database')

const Order_Item = db.define(
    'order_item',
    {
      id_order_item: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_order : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      id_makanan : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      quantity:{
        type : Sequelize.INTEGER,
        allowNull : true
      },
      total_harga_item:{
        type : Sequelize.INTEGER,
        allowNull : true
      },
  }
)

module.exports = Order_Item