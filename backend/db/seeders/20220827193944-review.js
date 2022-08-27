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

     return queryInterface.bulkInsert('Reviews',[
      {
        userId:2,
        spotId:1,
        review: 'Great place to visit to boost your coding skills',
        stars:4
      },
      {
        userId:3,
        spotId:1,
        review:'Is 420 all over year around',
        stars:3
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
  }
};
