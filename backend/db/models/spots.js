'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Spot.belongsTo(models.User, {foreignKey:'ownerId'})
     Spot.hasMany(models.Review,{foreignKey:'spotId'})
     Spot.hasMany(models.Booking,{foreignKey:'userId'})
     Spot.hasMany(models.Image,
     {
      foreighKey:'imageableId',
      constraints:false,
      scope:{
      imageableType:'Spot'
      }
    })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'CASCADE'
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
    },
    price: {
      type:DataTypes.NUMERIC(5,2),
      allowNull:false
    },
    previewImage: {
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ["previewImage","description","createdAt", "updatedAt"]
      }
    }
  });
  return Spot;
};
