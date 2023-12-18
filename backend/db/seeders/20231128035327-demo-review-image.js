'use strict';
const { ReviewImage } = require('../models')

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
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'image url'
    },
    {
      reviewId: 2,
      url: 'image url'
    },
    {
      reviewId: 3,
      url: 'image url'
    },
    {
      reviewId: 4,
      url: 'image url'
    },
    {
      reviewId: 5,
      url: 'image url'
    },
    {
      reviewId: 6,
      url: 'image url'
    },
    {
      reviewId: 7,
      url: 'image url'
    },
    {
      reviewId: 8,
      url: 'image url'
    },
    {
      reviewId: 9,
      url: 'image url'
    },
    {
      reviewId: 10,
      url: 'image url'
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
    options.tableName = 'reviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 6, 7, 8, 9, 10] }
    }, {});
  }
};
