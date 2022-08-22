// 'use strict';

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//      return queryInterface.bulkInsert('Spots', [
//       {
//         ownerId:1,
//         address: "123 Disney Lane",
//         city: "San Francisco",
//         state: "California",
//         country: "United States of America",
//         lat: 37.7645358,
//         lng: -122.4730327,
//         name: "App Academy",
//         description: "Place where web developers are created",
//         price: 123
//       },

//       {
//         ownerId:1,
//         address: "222 valentine av",
//         city: "Bronx",
//         state: "New York",
//         country: "United States of America",
//         lat: 37.7,
//         lng: -122.4,
//         name: "The Ghetto",
//         description: "right next to ms.168",
//         price: 400
//       }
//      ])
//   },

//   async down (queryInterface, Sequelize) {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Spots', {
//       name: { [Op.in]: ['App Academ', 'The Ghetto'] }
//     }, {});
//   }
// };

'use strict';

// Import Spot
const { Spot } = require('../models');

// Spots sample
const spots = [
  {
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
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /*
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let spotInfo of spots) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
      } = spotInfo;

      // get ownerId
      const ownerId = spots.findIndex(spot => spot === spotInfo) + 1

      await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /*
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots');
  }
};
