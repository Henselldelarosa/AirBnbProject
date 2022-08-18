const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post(
  '/',
  async (req, res) => {
    const { firstName, lastName,email, password, username } = req.body;
    console.log(password)
    const user = await User.signup({ firstName, lastName,email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);
module.exports = router;
