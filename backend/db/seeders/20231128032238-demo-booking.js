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
      spotId: 2,
      userId: 2,
      startDate: '2022-10-09',
      endDate:  '2023-09-12'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2021-12-09',
      endDate:  '2022-03-12'
    },
    {
      spotId: 4,
      userId: 4,
      startDate: '2022-12-09',
      endDate:  '2023-03-12'
    },
    {
      spotId: 5,
      userId: 5,
      startDate: '2025-12-09',
      endDate:  '2025-03-12'
    },
    {
      spotId: 6,
      userId: 6,
      startDate: '2026-12-09',
      endDate:  '2026-03-12'
    },
    {
      spotId: 7,
      userId: 7,
      startDate: '2027-12-09',
      endDate:  '2027-03-12'
    },
    {
      spotId: 8,
      userId: 8,
      startDate: '2028-12-09',
      endDate:  '2028-03-12'
    },
    {
      spotId: 9,
      userId: 9,
      startDate: '2029-12-09',
      endDate:  '2029-03-12'
    },
    {
      spotId: 10,
      userId: 10,
      startDate: '2030-12-09',
      endDate:  '2030-03-12'
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
