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
    await queryInterface.bulkInsert('order_items', [{
      id_order: 'asd6v6fq-2hs7-as89-27sj-s2fdrt5323fs',
      id_order_item: '6d778e5b-ef09-4969-a6ae-98a917f47206',
      id_makanan: '1fcc84b8-2212-4c12-8c46-21f0da035f03',
      quantity: 2,
      catatan: 'tidak Pedas',
      total_harga_item: 50000,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-2hs7-as89-27sj-s2fdrt5323fs',
      id_order_item: '8e211885-99ac-44cf-9df3-a9236f1d9edb',
      id_makanan: '3852c518-31e6-4c27-9428-bf9ed688b9d8',
      quantity: 1,
      catatan: 'Sambelnya banyakin',
      total_harga_item: 18000,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-2hs7-as89-27sj-s2fdrt5323fs',
      id_order_item: '2b571cf7-43ef-42fe-8311-0c9fbd32fc85',
      id_makanan: '847a3ed8-3430-4b28-a5ad-543e3ffb14de',
      quantity: 3,
      catatan: 'yang 1 es nya dikit aja',
      total_harga_item: 30000,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-j6d3-5g87-75fd-s2fdrt5323fs',
      id_order_item: '73ddff48-a88f-4c6d-9713-8b1100bc74b4',
      id_makanan: 'a5947ada-17bd-43a0-b6b9-93dd0296c8b9',
      quantity: 2,
      catatan: 'Minta bumbu rendangnya banyakin',
      total_harga_item: 40000,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-j6d3-5g87-75fd-s2fdrt5323fs',
      id_order_item: '937eaac5-978c-4846-977f-8a5dd92c2285',
      id_makanan: '847a3ed8-3430-4b28-a5ad-543e3ffb14de',
      quantity: 3,
      catatan: 'yang 2 es nya dikit aja',
      total_harga_item: 30000,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_order: 'asd6v6fq-j6d3-5g87-75fd-s2fdrt5323fs',
      id_order_item: '3244e81b-171b-4744-9bfb-e84ceaabc687',
      id_makanan: '1fcc84b8-2212-4c12-8c46-21f0da035f03',
      quantity: 1,
      total_harga_item: 25000,
      catatan: '-',
      status: 0,
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
