const Sequelize = require('sequelize')
const db = require('../config/database')

const Food = db.define(
    'food',
    {
      id_makanan: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
        type: Sequelize.UUID,
        allowNull : true
      },
  }
)

module.exports = Food