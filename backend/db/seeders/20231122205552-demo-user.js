'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Charlie',
        lastName: 'Brown'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Tom',
        lastName: 'Hanks'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Jason',
        lastName: 'Derulo'
      },
      {
        email: 'user4@user.io',
        username: 'Faker4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Billy',
        lastName: 'Bob'
      },
      {
        email: 'user5@user.io',
        username: 'Faker5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Clay',
        lastName: 'Jenson'
      },
      {
        email: 'user6@user.io',
        username: 'Faker6',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'James',
        lastName: 'Bond'
      },
      {
        email: 'user7@user.io',
        username: 'Faker7',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'Olivia',
        lastName: 'Rodrigo'
      },
      {
        email: 'user8@user.io',
        username: 'Faker8',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: 'Scooby',
        lastName: 'doo'
      },
      {
        email: 'user9@user.io',
        username: 'Faker9',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: 'Alice',
        lastName: 'Wonderland'
      },
      {
        email: 'user10@user.io',
        username: 'Faker10',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: 'Homer',
        lastName: 'Simpson'
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Faker4', 'FakeUser5', 'FakeUser6', 'FakeUser7', 'FakeUser8', 'FakeUser9', 'FakeUser10'] }
    }, {});
  }
};
