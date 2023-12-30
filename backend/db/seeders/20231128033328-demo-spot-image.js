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
        url: 'https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwaG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwaG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVybiUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1vZGVybiUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZXJuJTIwaG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1614255976202-8ce52bfcb655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVybiUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://plus.unsplash.com/premium_photo-1661963320562-771f7d283539?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vZGVybiUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2UlMjBpbnRlcmlvciUyMGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://plus.unsplash.com/premium_photo-1686167991758-e84276547710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://plus.unsplash.com/premium_photo-1683888725059-b912dda58ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1602774895672-b553538bceb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/flagged/photo-1573168710865-2e4c680d921a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1600122272511-c85c3a0209f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtpdGNoZW4lMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://plus.unsplash.com/premium_photo-1691642677915-a0d6d21430e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://plus.unsplash.com/premium_photo-1673014202191-7fc46fdbc38c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1584346651592-3aacc3c99075?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1632210702485-e1841e30752a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1631048499052-e6d9f305d2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1633505650701-6104c4fc72c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1543503103-f94a0036ed9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmF0aHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1632829401795-2745c905ac77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1584069793933-57852d7060ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1616486232086-81d47190669a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxiZWRyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxiZWRyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhdGhyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://plus.unsplash.com/premium_photo-1673014201877-64e88f4b5542?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://plus.unsplash.com/premium_photo-1681487169724-1bd4997294ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxiZWRyb29tfGVufDB8fDB8fHww',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://plus.unsplash.com/premium_photo-1681487136763-dcbee9be0e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ1fHxiZWRyb29tfGVufDB8fDB8fHww',
        preview: false
      },
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
