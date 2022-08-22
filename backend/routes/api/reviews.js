const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');
const router = express.Router();

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];



//*Get all Reviews by a Spot's id
//!GET


//*Add an Image to a Review based on the Review's id
//!POST

//*Edit a Review
//!PUT

//*Delete a Review
//!DELETE

module.exports = router;
