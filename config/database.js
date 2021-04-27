const Sequelize = require("sequelize")
require("dotenv").config()
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string()
        }
        return next()
      },
    },
    // for writing to database
    timezone: "+07:00",
  },
)

module.exports = db


// const Sequelize = require("sequelize")
// require("dotenv").config()
// const db = new Sequelize(
//   process.env.DB_NAME_DEV,
//   process.env.DB_USERNAME_DEV,
//   process.env.DB_PASSWORD_DEV,
//   {
//     host: process.env.DB_HOST_DEV,
//     dialect: "mysql",
//     dialectOptions: {
//       dateStrings: true,
//       typeCast(field, next) {
//         // for reading from database
//         if (field.type === "DATETIME") {
//           return field.string()
//         }
//         return next()
//       },
//     },
//     // for writing to database
//     timezone: "+07:00",
//   },
// )

// module.exports = db
