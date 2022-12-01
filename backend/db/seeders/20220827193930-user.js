'use strict';
// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
   return queryInterface.bulkInsert(options, [
    {
      firstName:'Dead',
      lastName:'Pool',
      email:'wolverinefan@gmail.com',
      username:'CaptainDeadPool',
      password:bcrypt.hashSync('crispyhigh5'),
      // password:'crispyhigh5'
    },
    {
      firstName:'Slim',
      lastName:'Shady',
      email:'therealslimsshady@hotmail.com',
      username:'Eminem',
      password:bcrypt.hashSync('IloveyouHailie'),
    },
    {
      firstName:'Abel',
      lastName:'Tesfaye',
      email:'theweeknd@gamil.com',
      username:'TheWeeknd',
      password:bcrypt.hashSync('Trilogy'),
    },
    {
      firstName:'Ash',
      lastName:'Ketchum',
      email:'gottacatchthemall@pokemon.com',
      username:'theVeryBest',
      password:bcrypt.hashSync('Ichooseyou'),
    },
   ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options)
    // {
    //   username: { [Op.in]: ['theVeryBest', 'TheWeeknd', 'Eminem', 'CaptainDeadPool'] }
    // }, {});
  }
};
