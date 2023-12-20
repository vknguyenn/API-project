'use strict';
const { Review } = require('../models')

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
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'This place is nice',
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: 'This place is meh',
        stars: 3
      },
      {
        spotId: 3,
        userId: 6,
        review: 'This place stinks',
        stars: 1
      },
      {
        spotId: 4,
        userId: 8,
        review: 'This place is fine',
        stars: 4
      },
      {
        spotId: 5,
        userId: 10,
        review: 'This place is cool',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'This place sucks',
        stars: 1
      },
      {
        spotId: 7,
        userId: 3,
        review: 'This place is very nice',
        stars: 5
      },
      {
        spotId: 8,
        userId: 5,
        review: 'This place is fine',
        stars: 4
      },
      {
        spotId: 9,
        userId: 7,
        review: 'This place is fun',
        stars: 5
      },
      {
        spotId: 10,
        userId: 9,
        review: 'This place is aight',
        stars: 4
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
