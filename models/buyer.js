const Sequelize = require("sequelize")
const db = require("../config/database")

const Buyer = db.define(
  "buyer",
  {
    id_pembeli: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    no_telp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_meja: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  },
)

module.exports = Buyer
