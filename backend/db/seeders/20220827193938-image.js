'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const bcrypt = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Images';
   return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Images'; // define table name in options object
    return queryInterface.bulkDelete(options, {
      imageableId: { [Op.in]: [1, 2] }
    }, {});
  }
};
