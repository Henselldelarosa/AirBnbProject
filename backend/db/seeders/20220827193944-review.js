'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
     options.tableName = 'Reviews'

     return queryInterface.bulkInsert(options,[
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
    options.tableName = 'Reviews'; // define table name in options object
     await queryInterface.bulkDelete(options);
  }
};
