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
    await queryInterface.bulkInsert('tables', [{
      id_meja: 'ab6295f0-234f-dsf6-ds53-c047463a1227',
      no_meja: '1',
      kapasitas: 4,
      lokasi: "{x:34,y:578}",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_meja: '39n5vb3c-43fx-3c5n-78vc-088dabbe65df',
      no_meja: '2',
      kapasitas: 4,
      lokasi: "{x:87,y:8}",
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
