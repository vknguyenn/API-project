'use strict';
const { SpotImage } = require('../models');

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

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'image url',
        preview: true
      },
      {
        spotId: 2,
        url: 'image url',
        preview: true
      },{
        spotId: 3,
        url: 'image url',
        preview: true
      },{
        spotId: 4,
        url: 'image url',
        preview: true
      },{
        spotId: 5,
        url: 'image url',
        preview: true
      },{
        spotId: 6,
        url: 'image url',
        preview: true
      },{
        spotId: 7,
        url: 'image url',
        preview: true
      },{
        spotId: 8,
        url: 'image url',
        preview: true
      },{
        spotId: 9,
        url: 'image url',
        preview: true
      },{
        spotId: 10,
        url: 'image url',
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
