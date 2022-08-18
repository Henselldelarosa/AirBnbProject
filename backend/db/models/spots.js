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
     Spot.hasMany(models.review,{foreignKey:'userId'})
     Spot.hasMany(models.booking,{foreignKey:'userId'})
     Spot.hasMany(models.image,
     {
      foreighKey:'imageableId',
      constraints:false,
      scope:{
      imageableType:'spot'
      }
    })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
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
  });
  return Spot;
};
