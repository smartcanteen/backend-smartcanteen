const Sequelize = require('sequelize')
const db = require('../config/database')

const Food = db.define(
    'food',
    {
      id_makanan: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
      harga : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      ketersediaan : {
        type : Sequelize.BOOLEAN,
        allowNull: false
      },
      id_penjual : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
  }
)

module.exports = Food