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
      previewImage: 'https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg?im_w=720'
    },

    {
      ownerId:1,
      address: "219 e 178 apt 52",
      city: "Bronx",
      state: "New York",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Building in Upper Bronx",
      description: "Every summer is a party all over the surounding areas",
      price: 200,
      previewImage: 'https://images1.loopnet.com/i2/XALiYv7rzJUVJhhvhmYHg8HPYbEtJNYlUehHVKGb1r8/110/6125-Broadway-Bronx-NY-Front-of-building-1-Large.jpg?im_w=720'
    },

    {
      ownerId:1,
      address: "123 What st",
      city: "Phoenix",
      state: "Arizona",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Sunny Land",
      description: "A place where you could literally cook an egg in the street",
      price: 123,
      previewImage: 'https://ap.rdcpix.com/bfc86805f87079d14b407657d95d5229l-m4076998045od-w480_h360_x2.jpg?im_w=720'
    },

    {
      ownerId:1,
      address: "234 Never Land",
      city: "Patterson",
      state: "New Jersey",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "2 Room House",
      description: "Nice place to get away from your daily activities",
      price: 123,
      previewImage: 'https://cdn.tollbrothers.com/communities/12663/images-resized/BammHollowaerialsOct201903_CC_RET_FALL_FINAL_920.jpg?im_w=720'
    },

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
      previewImage: 'https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg?im_w=720'
    },

    {
      ownerId:1,
      address: "323 don't come back st",
      city: "Kissimmi",
      state: "Florida",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "3 Bedroom house in Florida",
      description: "A beautiful place to visit and see wild life",
      price: 123,
      previewImage: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg?im_w=720'
    },

    {
      ownerId:2,
      address: "Asgard",
      city: "Asgard",
      state: "New Asgard",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Asgard",
      description: "If you see loki dont trust him",
      price: 123,
      previewImage: 'https://wallpaperaccess.com/full/1135531.jpg?im_w=720'
    },

    {
      ownerId:2,
      address: "345 Somewhere",
      city: "The Jungle",
      state: "Wakanda",
      country: "Africa",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Wakanda Forever",
      description: "If you visit and you steal some vibranium your stay is freww",
      price: 123,
      previewImage: 'https://nypost.com/wp-content/uploads/sites/2/2019/12/wakanda-usda.jpg?quality=75&strip=all?im_w=720'
    },

    {
      ownerId:2,
      address: "344 ocean",
      city: "Bikini Bottom",
      state: "Sydney",
      country: "Australia",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Pineapple Under The sea",
      description: "Who lives in a pineapple under the sea>",
      price: 123,
      previewImage: 'https://thespongeclub.com/wp-content/uploads/2022/07/Spongebob-House-Guide.png?im_w=720'
    },

    {
      ownerId:2,
      address: "434",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Stark Tower",
      description: "That ugly building in Manhattan ",
      price: 123,
      previewImage: 'https://i.pinimg.com/originals/5f/8f/0a/5f8f0a23c9c06b4846feaca91d10803d.jpg?im_w=720'
    },

    {
      ownerId:2,
      address: "2 black ops",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Nuketwon",
      description: "Not a good place for comapers",
      price: 123,
      previewImage: 'https://callofdutymaps.com/wp-content/uploads/nuketown4.jpg?im_w=720'
    },

    {
      ownerId:2,
      address: "222 valentine av",
      city: "Bronx",
      state: "New York",
      country: "United States of America",
      lat: 37.7,
      lng: -122.4,
      name: "The Ghetto",
      description: "right next to ms.168",
      price: 400,
      previewImage: "https://images1.apartments.com/i2/_MfRvyDp-3rqwoWuT9FXNyGPl0UNtMTOr8hSoljCXqA/111/2772-valentine-ave-bronx-ny-building-photo.jpg?im_w=720"
    }


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
