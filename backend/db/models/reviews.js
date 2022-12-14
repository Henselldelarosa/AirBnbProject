'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.Image,{
        foreignKey:'imageableId',
        constraints:false,
        scope:{
        imageableType:'Review'
        }
      })
      Review.belongsTo(models.Spot,{foreignKey:'spotId'})
      Review.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  Review.init({
    userId: {
      type:DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    spotId: {
      type:DataTypes.INTEGER,

      onDelete: 'CASCADE'
    },
    review: {
      type:DataTypes.STRING,
      allowNull:false
    },
    stars: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {
      attributes: {
        //exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Review;
};
