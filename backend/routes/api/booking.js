const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Booking } = require('../../db/models');
const router = express.Router();

router.get('/', async(req,res)=>{
  const booking = await Booking.findAll()
  res.json(booking)
})

module.exports = router;
