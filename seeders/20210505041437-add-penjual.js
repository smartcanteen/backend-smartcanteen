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
    await queryInterface.bulkInsert('sellers', [{
      id_penjual: 'ab6295f0-2c72-4ef4-9fac-c047463a1227',
      first_name: 'Athalla',
      last_name: "Rag",
      no_telp: "0881293123",
      email: "athalla@gmail.com",
      password: encryptPass("penjual1"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_penjual: '1d3ad08b-4f2b-4b8e-820b-088dabbe65df',
      first_name: 'Penjual',
      last_name: "Dev",
      no_telp: "081231234123",
      email: "dev@gmail.com",
      password: encryptPass("penjualdev"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
