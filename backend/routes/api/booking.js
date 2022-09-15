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

//*Edit a booking
// router.put('/:bookingId', requireAuth, async (req, res, next) => {
//   // deconstruct bookingId
//   const { bookingId } = req.params;

//   // deconstruct request body
//   const {
//     startDate,
//     endDate
//   } = req.body;


//   // get the current user info
//   const currentUser = await User.findOne({
//     where: {
//       id: req.user.id
//     }
//   });

//   // find booking to authorize
//   const bookingAuthorize = await Booking.findByPk(bookingId);

//   if (bookingAuthorize && bookingAuthorize.userId !== req.user.id) {
//     const err = Error("Forbidden");
//     err.status = 403;
//     return next(err);
//   }


//   const booking = await Booking.findOne({
//     where: {
//       id: bookingId,
//       userId: currentUser.id
//     }
//   });

//   if (!booking) {
//     const err = Error("Booking couldn't be found");
//     err.status = 404;
//     return next(err);
//   }


//   // set end date variable for comparing with request body date
//   const endDateCompare = booking.endDate.toISOString().split('T')[0];
//   const dateNowCompare = new Date().toISOString().split('T')[0];
//   const startDateCompare = booking.startDate.toISOString().split('T')[0];

//   if (endDateCompare < dateNowCompare) {
//     const err = Error("Past bookings can't be modified");
//     err.status = 403;
//     return next(err);
//   }


//   if (booking) {
//     // set comparison start/end date variable for comparing with request body date

//     // if booking start date or end date exist with given dates
//     if (startDateCompare === startDate || endDateCompare === endDate) {
//       const err = Error("Sorry, this spot is already booked for the specified dates");
//       err.status = 403;
//       err.errors = {};

//       // start date conflicts
//       if (startDateCompare === startDate) {
//         err.errors.startDate = "Start date conflicts with an existing booking";
//       }

//       // end date conflicts
//       if (endDateCompare === endDate) {
//         err.errors.endDate = "End date conflicts with an existing booking";
//       }

//       return next(err);
//     }
//   }


//   const updateBooking = await booking.update({
//     startDate,
//     endDate
//   });

//   res.json(updateBooking);
// });

module.exports = router;
