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

    await queryInterface.bulkInsert('food', [{
      id_makanan: '04653702-3c0b-4194-ac82-c67dc54dcad7',
      nama: 'Risoles Mayo',
      harga: 10000,
      ketersediaan: true,
      kategori: "Makanan Ringan,Favourite",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '068a5e03-3f86-4446-a2c4-f5590c092e4f',
      nama: 'Es Jeruk',
      harga: 8000,
      ketersediaan: true,
      kategori: "Minuman,Favourite",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '1fcc84b8-2212-4c12-8c46-21f0da035f03',
      nama: 'Mie Ayam Komplit',
      harga: 25000,
      ketersediaan: true,
      kategori: "Mi,Bakso & Soto,Favourite,Makan Siang",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '3852c518-31e6-4c27-9428-bf9ed688b9d8',
      nama: 'Nasi Goreng',
      harga: 18000,
      ketersediaan: true,
      kategori: "Nasi,Sarapan",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '9c194739-1a43-4b01-a2a5-292479360d69',
      nama: 'Bubur Ayam',
      harga: 15000,
      ketersediaan: true,
      kategori: "Sarapan,Favourite",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: 'e68a20c7-4937-4566-bc61-4bd08d97891c',
      nama: 'Lontong Sayur',
      harga: 20000,
      ketersediaan: true,
      kategori: "Sarapan, Makan Siang",
      id_warung: "494638a3-5789-44e5-8e12-47186495a831",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '757140c1-fee3-4a7f-a3c7-9585cb485506',
      nama: 'Nasi Goreng',
      harga: 15000,
      ketersediaan: true,
      kategori: "Nasi,Sarapan,Makan Siang",
      id_warung: "d18229c0-3ba0-4df9-bb21-da955ccc83e6",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '847a3ed8-3430-4b28-a5ad-543e3ffb14de',
      nama: 'Es Teh Manis',
      harga: 10000,
      ketersediaan: true,
      kategori: "Minuman",
      id_warung: "d18229c0-3ba0-4df9-bb21-da955ccc83e6",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: 'a5947ada-17bd-43a0-b6b9-93dd0296c8b9',
      nama: 'Nasi Uduk',
      harga: 10000,
      ketersediaan: true,
      kategori: "Nasi,Favourite,Sarapan",
      id_warung: "d18229c0-3ba0-4df9-bb21-da955ccc83e6",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: 'd6102ba8-ca68-4f66-af0b-5d7ec935f4c1',
      nama: 'Roti',
      harga: 10000,
      ketersediaan: true,
      kategori: "Roti,Sarapan",
      id_warung: "d18229c0-3ba0-4df9-bb21-da955ccc83e6",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_makanan: '31c9089e-085c-4d00-8599-7a49a341c8b6',
      nama: 'Nasi Rendang',
      harga: 18000,
      ketersediaan: true,
      kategori: "Nasi,Daging,Makan Siang",
      id_warung: "d18229c0-3ba0-4df9-bb21-da955ccc83e6",
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
