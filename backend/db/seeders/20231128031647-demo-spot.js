'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: '123 Seseme St',
      city: 'Baltimore',
      state: 'Maryland',
      country: 'USA',
      lat: 23.333,
      lng: -123.44,
      name: 'Big Bird',
      description: 'Very nice',
      price: 249.99
    },
    {
      ownerId: 2,
      address: '42 Wallaby Way',
      city: 'Salt Lake City',
      state: 'Utah',
      country: 'USA',
      lat: 43.323,
      lng: -163.94,
      name: 'Jacky Roo',
      description: 'Very cool',
      price: 300.00
    },
    {
      ownerId: 3,
      address: '999 Bean Ave',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      lat: 89.633,
      lng: -173.47,
      name: 'Mr. Bean',
      description: 'Very chill',
      price: 249.99
    },
    {
      ownerId: 4,
      address: '654 Nutcracker St',
      city: 'Green Bay',
      state: 'Wisconsin',
      country: 'USA',
      lat: 10.633,
      lng: -133.47,
      name: 'Mr. Snoopy',
      description: 'Cool Beans',
      price: 244.99
    },
    {
      ownerId: 5,
      address: '666 Hollow Drive',
      city: 'Denver',
      state: 'Colorado',
      country: 'USA',
      lat: 10.6312343,
      lng: -23.4732,
      name: 'Halloween Town',
      description: 'Spooky',
      price: 666.66
    },
    {
      ownerId: 6,
      address: '456 Happy Street',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      lat: 103.6312343,
      lng: -13.4732,
      name: 'Sunny Home',
      description: 'Sunny',
      price: 1000
    },
    {
      ownerId: 7,
      address: '647 Doodoo lane',
      city: 'Sacramento',
      state: 'California',
      country: 'USA',
      lat: 103.12343,
      lng: -53.45732,
      name: 'Cheap Home',
      description: 'Stinks',
      price: 10
    },
    {
      ownerId: 8,
      address: '9690 Gumball Road',
      city: 'Detroit',
      state: 'Michigan',
      country: 'USA',
      lat: 17.633,
      lng: -13.42,
      name: 'Willy Wonka',
      description: 'Yummy',
      price: 777
    },
    {
      ownerId: 9,
      address: '486 FunLand Drive',
      city: 'Tampa',
      state: 'Florida',
      country: 'USA',
      lat: 10.6343,
      lng: -103.732,
      name: 'DisneyLand',
      description: 'Fun',
      price: 9999
    },
    {
      ownerId: 10,
      address: '4856 Last Drive',
      city: 'Houston',
      state: 'Texas',
      country: 'USA',
      lat: 100.6343,
      lng: -109.7532,
      name: 'Texas Roadhouse',
      description: 'Yeehaw',
      price: 12
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});

  }
};
