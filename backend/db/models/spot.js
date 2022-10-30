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
     Spot.hasMany(models.Booking,{foreignKey:'spotId'})
     Spot.hasMany(models.Image,
     {
      foreignKey:'imageableId',
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
    // bookingId:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false
    // },
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
    lat: {
      type:DataTypes.INTEGER,
      validate:{
        isFloat:true
      }
    },
    lng: {
      type:DataTypes.INTEGER,
      validate:{
        isFloat:true
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
    },
    price: {
      type:DataTypes.INTEGER,
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
        //exclude: ["description","createdAt", "updatedAt"]
      }
    },
    scopes:{
      booking(){
        return{
          attributes:{
            exclude:["description", "createdAt", "updatedAt"]
          }
        }
      }
    }

  });
  return Spot;
};
