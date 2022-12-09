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
    },

    {
      ownerId:1,
      address: "222 Downtown",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "Avenger Tower",
      description: "That ugly building in Manhattan",
      price: 400,
      previewImage: "https://mir-s3-cdn-cf.behance.net/projects/404/c9874c104487161.Y3JvcCw3MDE2LDU0ODcsMCwyMjIy.jpg"
    },

    {
      ownerId:1,
      address: "Not Known",
      city: "Wakanda",
      state: "Wakanda Forever",
      country: "Africa",
      lat: 37.7,
      lng: -122.4,
      name: "Wakanda",
      description: "If you book a stay steal me some vibranium",
      price: 400,
      previewImage: "https://media.architecturaldigest.com/photos/5a970759891f6e6a41b121d4/16:9/w_2560%2Cc_limit/STT0020_v014_031049.1092.jpg"
    },

    {
      ownerId:2,
      address: "Avengers upstate",
      city: "Upstate",
      state: "New York",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "Avenger Facility",
      description: "If you have powers you might be an avenger",
      price: 400,
      previewImage: "https://i0.wp.com/www.futurerulerofmidgard.com/wp-content/uploads/2017/05/DSC_0936.jpg"
    },

    {
      ownerId:2,
      address: "Nuclear city",
      city: "Some where",
      state: "Area 51",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "Nuke Town",
      description: "Visit at your own risk",
      price: 400,
      previewImage: "https://callofdutymaps.com/wp-content/uploads/nuketown5.jpg"
    },

    {
      ownerId:2,
      address: "Greek Mythology",
      city: "Greece",
      state: "Mt.Olympus",
      country: "Asia",
      lat: 37.7,
      lng: -122.4,
      name: "Visit the gods",
      description: "If you can lift the key you may stay for free",
      price: 400,
      previewImage: "https://www.ancient-origins.net/sites/default/files/field/image/Mount-Olympus.jpg"
    },


    {
      ownerId:2,
      address: "Ask Batman",
      city: "Gotham",
      state: "New York",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "Batcave",
      description: "For an extra pay you may ride the batmovile",
      price: 400,
      previewImage: "https://i.etsystatic.com/27594719/r/il/89a142/3049667326/il_fullxfull.3049667326_fvhn.jpg"
    },



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
