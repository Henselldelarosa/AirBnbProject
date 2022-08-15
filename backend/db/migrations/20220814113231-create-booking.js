'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false,
        validate:{
          isBefore:'2080-10-10',
          isAfter:Sequelize.literal("CURRENT_TIMESTAMP")
        }
      },
      endDate: {
        type: Sequelize.INTEGER,
        allowNull:false,

        validate:{

        }

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
