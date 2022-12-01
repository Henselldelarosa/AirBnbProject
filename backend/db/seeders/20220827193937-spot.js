'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
   return queryInterface.bulkInsert(options, [
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
      price: 123,
      previewImage: 'https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg'
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
      price: 400,
      previewImage: "https://images1.apartments.com/i2/_MfRvyDp-3rqwoWuT9FXNyGPl0UNtMTOr8hSoljCXqA/111/2772-valentine-ave-bronx-ny-building-photo.jpg"
    }
   ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['The Ghetto', 'App Academy'] }
    }, {});
  }
};
