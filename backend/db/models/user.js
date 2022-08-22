'use strict';
const {
  Model, Validator
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this; // context will be the User instance
      return { id, firstName, lastName, username, email };
    }

    validatePassword(password) {
      // return password;
      console.log("password (before)", password);


      return bcrypt.compareSync(password, this.password.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({

        firstName,
        lastName,
        username,
        email,
        // password
        password:hashedPassword
      });
      console.log(user, "klklklk")
      return await User.scope('loginUser').findByPk(user.id);
    }

    static async login({ credential, password }) {
      // console.log(password, 'hello')
      // console.log("here");
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        // console.log("password", password);
        // console.log("user.validatePassword(password)", user.validatePassword(password));
        return await User.scope('loginUser').findByPk(user.id);
      }
    }
    static associate(models) {
      User.hasMany(models.Review, {foreignKey:'userId'})
      User.hasMany(models.Spot,{foreignKey:'ownerId'})
      User.hasMany(models.Booking,{foreighkey:'userId'})
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }

    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        len:[3,256],
        isEmail:true
      }
    },
    username: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        len:[4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        },
        isOneWord(value){
          if(value.split(" ").length >= 2){
            throw new Error("No spaces allowed")
          }
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[60,60]
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser() {
        return {
          attributes: { exclude: ["password"] }
        }
      },
      loginUser() {
        return {
          attributes: {}
        }
      }

    }
  });
  return User;
};
