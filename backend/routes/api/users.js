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
  '/', validateLogin, requireAuth,
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
      username:user.username
    });
  }
);


router.post(
  ['/','/new'],
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, firstName, lastName, password });

    await setTokenCookie(res, user);

    return res.json({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      username:user.username,
      token:token
    });
  }
);

module.exports = router;
