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

    await queryInterface.bulkInsert('tenants', [{
      id_warung: '494638a3-5789-44e5-8e12-47186495a831',
      nama_warung: 'Munjul didepan',
      deskripsi: "Menyediakan segala macam makanan dan minuman",
      id_penjual: "ab6295f0-2c72-4ef4-9fac-c047463a1227",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_warung: 'd18229c0-3ba0-4df9-bb21-da955ccc83e6',
      nama_warung: 'Warteg Barokah',
      deskripsi: "Menyediakan segala macam makanan dan minuman",
      id_penjual: "1d3ad08b-4f2b-4b8e-820b-088dabbe65df",
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
