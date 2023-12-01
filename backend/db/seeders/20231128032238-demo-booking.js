'use strict';
const { Booking } = require('../models')

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
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      startDate: '2020-11-11',
      endDate:  '2021-03-12'
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '2022-10-09',
      endDate:  '2023-09-12'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2021-12-09',
      endDate:  '2022-03-12'
    },
    {
      spotId: 1,
      userId: 3,
      startDate: '2022-12-09',
      endDate:  '2023-03-12'
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
