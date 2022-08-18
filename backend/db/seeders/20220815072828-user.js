'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users', [
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['theVeryBest', 'TheWeeknd', 'Eminem', 'CaptainDeadPool'] }
    }, {});
  }
};
