// 'use strict';

// const { Booking, User, Spot } = require('../models');

// // Today's date
// const moment = require('moment-timezone');
// const today = moment.utc().format('YYYY-MM-DD');

// const bookings = [
//   {
//     startDate: today,
//     endDate: today
//   }
// ];

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//     for (let bookingInfo of bookings) {
//       const {
//         startDate,
//         endDate
//       } = bookingInfo;

//       // userId
//       const user = await User.findByPk(1);

//       // spotId
//       const spot = await Spot.findByPk(1);

//       // create booking
//       await Booking.create({
//         spotId: spot.id,
//         userId: user.id,
//         startDate,
//         endDate
//       });
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.bulkDelete('Bookings');
//   }
// };

'use strict';

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

     return queryInterface.bulkInsert('Bookings',[

      {
        spotId:1,
        userId:1,
      startDate: "2021-11-19",
      endDate: "2021-11-20"
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings');
  }
};
