'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Spots', [
    {
      ownerId:1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },

    {
      ownerId:1,
      address: "222 valentine av",
      city: "Bronx",
      state: "New York",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "The Ghetto",
      description: "right next to ms.168",
      price: 400
    }
   ],{})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['The Ghetto', 'App Academy'] }
    }, {});
  }
};
