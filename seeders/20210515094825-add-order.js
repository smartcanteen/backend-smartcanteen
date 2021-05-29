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
    await queryInterface.bulkInsert('orders', [{
      id_order: 'asd6v6fq-2hs7-as89-27sj-s2fdrt5323fs',
      id_pembeli: 'ab6295f0-2hs7-as89-27sj-c047463a1227',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-j6d3-5g87-75fd-s2fdrt5323fs',
      id_pembeli: '1d3ad08b-8sjd-as3g-sd3f-088dabbe65df',
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
