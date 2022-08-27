'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Images', [
   {
    url: "image url",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "image url 2",
    imageableType: "Spot",
    imageableId: 2
  },
   ],{})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      imageableId: { [Op.in]: [1, 2] }
    }, {});
  }
};
