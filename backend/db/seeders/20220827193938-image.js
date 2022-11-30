'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Images', [
    {
      url: "https://i.ytimg.com/vi/CUowt8pwRCM/maxresdefault.jpg",
      imageableType: "Spot",
      imageableId: 1
    },
   {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0y40mox60ZBq-n6voBLh3PSkjDBIlRcOM4ZLZmt0-8fwsd7KneUvEF55flCm-ekDGIc&usqp=CAU",
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
