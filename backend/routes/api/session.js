const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors,validateLogin } = require('../../utils/validation');


//a
// const flatten = (obj = {}, res = {}, extraKey = '') => {
//   for(key in obj){
//      if(typeof obj[key] !== 'object'){
//         res[extraKey + key] = obj[key];
//      }else{
//         flatten(obj[key], res, `${extraKey}${key}.`);
//      };
//   };
//   return res;
// };
// router.post(
//   '/',
//   async (req, res, next) => {
//     const { credential, password } = req.body;
//     const user = await User.login({ credential, password });
//     if (!user) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = ['The provided credentials were invalid.'];
//       return next(err);
//     }

//      const token = setTokenCookie(res, user);

//     return (res.json(user));
//   }
// );



// //Make a middleware called validateLogin that will check these keys and validate them
// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password.'),
//   handleValidationErrors
// ];


// // Log in
// // router.post(
// //   '/',
// //   validateLogin,
// //   async (req, res, next) => {
// //     const { credential, password } = req.body;

// //     const user = await User.login({ credential, password });

// //     if (!user) {
// //       const err = new Error('Login failed');
// //       err.status = 401;
// //       err.title = 'Login failed';
// //       err.errors = ['The provided credentials were invalid.'];
// //       return next(err);
// //     }

// //     await setTokenCookie(res, user);

// //     return res.json({
// //       user
// //     });
// //   }
// // );
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);
// //restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

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

module.exports = router;
