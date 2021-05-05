'use strict';

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
    await queryInterface.bulkInsert('buyers', [{
      id_pembeli: 'ab6295f0-2hs7-as89-27sj-c047463a1227',
      first_name: 'Novita',
      last_name: "Ajah",
      no_telp: "0812412321",
      email: "novita@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_pembeli: '1d3ad08b-8sjd-as3g-sd3f-088dabbe65df',
      first_name: 'Pembeli',
      last_name: "Dev",
      no_telp: "081231234123",
      email: "dev@gmail.com",
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
