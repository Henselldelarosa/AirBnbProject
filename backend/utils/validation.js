// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { query } = require('express-validator/check');
const {Booking} = require('../db/models')

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
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({checkFalsy: true})
    .isLength({min:2})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({checkFalsy: true})
    .isLength({min:2})
    .withMessage('Last Name is required'),
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

const validateBooking = [
  check('startDate')
  .exists({checkFalsy:true})
  .withMessage('Start Date is Required'),
  check('endDate')
  .exists({checkFalsy:true})
  .withMessage('End Date is Required'),

  check("endDate", "startDate")
    .custom((a, b) => {
      const { startDate, endDate } = b.req.body;
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("endDate cannot be on or before startDate"),
    check("startDate")
    .custom((a,b) => {
      const { startDate, endDate } = b.req.body;
      const start = new Date(startDate);
      const today = new Date();
      if (start < today) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Sorry the Start Date can't be the current day or before the current day"),
    // check('endDate')
    // .custom((a,b) =>{
    //   const {startDate, endDate} = b.req.body
    //   const today = new Date()

    //   if(endDate <= today){
    //     return false
    //   }
    //   return true
    // })
    // .withMessage("Sorry the end Date can't be the current day or before the current day"),
    // // check('startDate', 'endDate')
    // .custom( async (a,b) =>{
    //   const {spotId} = a.req.body
    //   const { startDate, endDate } = b.req.body;
    //   const firstDate = new Date(startDate);

    //   const findBooking = await Booking.findAll({
    //     where:{
    //       spotId
    //     }
    //   })

    //   for (let i = 0; i < findBooking.length; i++){
    //     let booking = findBooking[i]
    //     let bookingStart = new Date(booking.startDate).getTime()
    //     let bookingEnd = new Date(booking.endDate).getTime()
    //     if(firstDate.getTime() >= bookingStart && firstDate.getTime()<= bookingEnd){
    //       return false
    //        }else{
    //         return true
    //        }
    //   }
    // })
    // .withMessage("Sorry, this spot is already booked for the specified dates"),

  handleValidationErrors
]

const deleteBookingValidation = [
  check('startDate')
  .custom((a)=>{
    const {startDate} = a.req.body
    const today = new Date()

    if(startDate <= today){
      return false
    }
    return true
  })
  .withMessage('Cant Cancel a booking that has already started'),

  check('endDate')
  .custom((a)=>{
    const {endDate} = a.req.body
    const today = new Date()

    if(endDate <= today){
      return false
    }
    return true
  })
  .withMessage('Cant Cancel a booking for a day that has already passed'),
  handleValidationErrors
]

const validateQuery = [
  query('page')
    .isInt({ min: 0 })
    .default(0)
    .optional()
    .withMessage('Page must be greater than or equal to 0'),
  check('size')
    .isInt({ min: 0 })
    .default(20)
    .optional()
    .withMessage('Size must be greater than or equal to 0'),
  check('minLat')
    .isDecimal()
    .optional()
    .withMessage('Minimum latitude is invalid'),
  check('maxLat')
    .isDecimal()
    .optional()
    .withMessage('Maximum latitude is invalid'),
  check('minLng')
    .isDecimal()
    .optional()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .isDecimal()
    .optional()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Minimum price must be greater than 0'),
  check('maxPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Maximum price must be greater than 0'),
  handleValidationErrors
];



module.exports = {
  validateQuery,
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateSpot,
  validateReview,
  validateBooking,
  deleteBookingValidation
};
