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
      city: 'Waffle Grove',
      state: 'Florida',
      country: 'USA',
      lat: 12343.333,
      lng: -12343.44,
      name: 'Big Bird',
      description: 'Very nice',
      price: 249.99
    },
    {
      ownerId: 2,
      address: '42 Wallaby Way',
      city: 'Sydney',
      state: 'Kangrooland',
      country: 'AUS',
      lat: 16743.323,
      lng: -16343.94,
      name: 'Jacky Roo',
      description: 'Very cool',
      price: 300.00
    },
    {
      ownerId: 3,
      address: '999 Bean Ave',
      city: 'Bean Town',
      state: 'Chicago',
      country: 'USA',
      lat: 10343.633,
      lng: -18343.47,
      name: 'Mr. Bean',
      description: 'Very chill',
      price: 249.99
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});

  }
};
