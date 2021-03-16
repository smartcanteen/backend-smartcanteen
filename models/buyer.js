const Sequelize = require('sequelize')
const db = require('../config/database')

const Buyer = db.define(
    'buyer',
    {
      id_pembeli: {
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
      },
      id_meja: {
        type : Sequelize.INTEGER,
        allowNull : true
      }
  }
)

module.exports = Buyer