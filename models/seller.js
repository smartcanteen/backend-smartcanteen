const Sequelize = require('sequelize')
const db = require('../config/database')

const Seller = db.define(
  'seller',
  {
    id_penjual: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
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
    password : {
      type : Sequelize.STRING,
      allowNull : false
    }
  },
  {
    paranoid: true,
  }
)

module.exports = Seller