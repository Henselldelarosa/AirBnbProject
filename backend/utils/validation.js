// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Validation error.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    next(err);
  }
  next();
};
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({checkFalsy: true})
    .isLength({min:2})
    .withMessage('Provide your First Name'),
  check('lastName')
    .exists({checkFalsy: true})
    .isLength({min:2})
    .withMessage('Provide your Last name'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

//* MAKE the validation for spot
const validateSpot = [
  // check if address is valid
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  // check if city is valid
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  // check if state is valid
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  // check if country is valid
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  // check if lat is valid
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  // check if longitude is valid
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  // check if name is valid
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name must be less than 50 characters'),
  // check that name is no longer than 50 characters
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  // check if description is valid
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  // check if price is valid
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateSpot,
  validateReview
};
