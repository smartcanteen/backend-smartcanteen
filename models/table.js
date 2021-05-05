const Sequelize = require("sequelize")
const db = require("../config/database")

const Table = db.define(
  "table",
  {
    id_meja: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    no_meja: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    kapasitas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lokasi: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  },
)

module.exports = Table
