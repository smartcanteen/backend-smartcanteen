const Sequelize = require('sequelize')
const db = require('../config/database')

const Table = db.define(
    'table',
    {
      id_meja: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      no_meja : {
        type : Sequelize.STRING,
        allowNull : false
      },
      status : {
        type : Sequelize.BOOLEAN,
        allowNull: false
      }
  }
)

module.exports = Table