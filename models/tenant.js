const Sequelize = require("sequelize")
const db = require("../config/database")

const Tenant = db.define(
  "tenant",
  {
    id_warung: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    nama_warung: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    id_penjual: {
      type: Sequelize.UUID,
      allowNull: true,
    }
  },
  {
    paranoid: true,
  },
)

module.exports = Tenant
