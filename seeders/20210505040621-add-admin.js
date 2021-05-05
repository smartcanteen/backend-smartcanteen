'use strict';
const { encryptPass, isValid } = require("../helpers/encrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('admins', [{
      id_admin: 'ba515fbd-a95c-4c34-adfa-9b065ad318ea',
      first_name: 'Admin',
      last_name: "Dev",
      no_telp: "08123123421",
      email: "dev@gmail.com",
      password: encryptPass("admindev"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_admin: 'f612bb40-e24d-4b70-8ee0-8f279c579f71',
      first_name: 'Alif',
      last_name: "Dev",
      no_telp: "08123123412",
      email: "alif@gmail.com",
      password: encryptPass("admin2"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },
  // first_name: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // last_name: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // no_telp: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // email: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // password: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
