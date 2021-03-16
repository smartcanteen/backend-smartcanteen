const Sequelize = require('sequelize')
const db = require('../config/database')

const Seller = db.define(
    'seller',
    {
      id_penjual: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name : {
        type : Sequelize.STRING,
        allowNull : false
      },
      last_name : {
        type : Sequelize.STRING,
        allowNull : false
      },
      email : {
        type : Sequelize.STRING,
        allowNull : false
      },
      no_telp : {
        type : Sequelize.STRING,
        allowNull : false
      }
  }
)

module.exports = Seller