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
        url: 'img1.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'img2.jpg',
        preview: true
      },{
        spotId: 3,
        url: 'img3.jpg',
        preview: true
      },{
        spotId: 4,
        url: 'img4.jpg',
        preview: true
      },{
        spotId: 5,
        url: 'img5.jpg',
        preview: true
      },{
        spotId: 6,
        url: 'img6.jpg',
        preview: true
      },{
        spotId: 7,
        url: 'img7.jpg',
        preview: true
      },{
        spotId: 8,
        url: 'img8.jpg',
        preview: true
      },{
        spotId: 9,
        url: 'img9.jpg',
        preview: true
      },{
        spotId: 10,
        url: 'img10.jpg',
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
