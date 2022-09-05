const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth,restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors, validateLogin, validateSignup } = require('../../utils/validation');
// ...

//*log in user
//!GET
router.post(
  '/', validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });
    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

     const token = setTokenCookie(res, user);

    res.json({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      username:user.username,
      token:token
    });
  }
);


//*Sign Up a User
router.post(
  ['/','/new'],
  validateSignup,
  async (req, res,next) => {
    const {
      email,
      password,
      username,
      firstName,
      lastName } = req.body;
    const elreadyUser = await User.getCurrentUserByEmail(email);


    if(elreadyUser){
      const error = new Error("User already exists");
      error.status = 403;
      error.errors = {
        email: "User with that email already exists"
      };
      return next(error);
    }
    const user = await User.signup({ email, password, username, firstName, lastName });
    const token = setTokenCookie(res, user);

    const newUserInfo = await User.scope('currentUser').findByPk(user.id);
    newUserInfo.dataValues['token'] = token;
    return res.json({
      newUserInfo
    });
  }
);

module.exports = router;
