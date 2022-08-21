'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'CASCADE',
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'CASCADE',
    },
    startDate:{
      type:DataTypes.DATE,
      allowNull:false,
    },
    endDate:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {
      attributes: {
        exclude: ["id","userId","createdAt", "updatedAt"]
      }
    }
  });
  return Booking;
};
