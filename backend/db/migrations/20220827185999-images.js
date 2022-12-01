'use strict';
// NEW: add this code to each create table migration file
let options = {};
options.tableName = 'Images'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // userId: {
      //   type: Sequelize.INTEGER
      // },
      url: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      imageableType: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      imageableId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      }

    },options);
  }catch(e){
console.log(e.message)
  }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images',options);
  }

};
