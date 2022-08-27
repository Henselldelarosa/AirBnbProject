'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Spot,{foreignKey:'imageableId', constraints:false})
      Image.belongsTo(models.Review,{foreignKey:'imageableId', constraints:false})
    }
  }
  Image.init({
    // userId: {
    //   type:DataTypes.INTEGER,
    // allowNull:false
    // },
    url: {
      type:DataTypes.STRING(255),
      allowNull:false
    },
    imageableType: {
      type:DataTypes.STRING(50),
      allowNull:false
    },
    imageableId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:"CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt","imageableType"]
      }
    }
  });
  return Image;
};
