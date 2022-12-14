const express = require('express');
const {requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking,Spot } = require('../../db/models');
const router = express.Router();

router.get('/', async(req,res)=>{
  const booking = await Booking.findAll()
  res.json(booking)
})

router.get('/current', [restoreUser, requireAuth], async (req, res, next) => {

const booking = await Booking.findAll({
  where:{
    userId:req.user.id,
  },

  include:{
    model:Spot,
    attributes:JSON.parse(JSON.stringify(
      ["address","city","state",
      "country","lat","lng","name",
      "price","previewImage"]))
  },

})

res.json({Bookings:booking})
});
//*Edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
  // deconstruct bookingId
  const { bookingId } = req.params;

  // deconstruct request body
  const {
    startDate,
    endDate
  } = req.body;

  let firstDate = new Date(startDate)
  let secondDate = new Date(endDate)
  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find booking to authorize
  const bookingAuthorize = await Booking.findByPk(bookingId);

  if (bookingAuthorize && bookingAuthorize.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }


  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: currentUser.id
    }
  });

  if (!booking) {
    const err = Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }


  // set end date variable for comparing with request body date
  const dateNowCompare = new Date().getTime()
  let bookingStart = new Date(booking.startDate).getTime()
  let bookingEnd = new Date(booking.endDate).getTime()

  if (bookingEnd < dateNowCompare) {
    const err = Error("Past bookings can't be modified");
    err.status = 403;
    return next(err);
  }


  if (booking) {
    // set comparison start/end date variable for comparing with request body date

    // if booking start date or end date exist with given dates
    if (bookingStart === firstDate || bookingEnd === secondDate) {
      const err = Error("Sorry, this spot is already booked for the specified dates");
      err.status = 403;
      err.errors = {};

      // start date conflicts
      if (bookingStart === firstDate) {
        err.errors.bookingStart = "Start date conflicts with an existing booking";
      }

      // end date conflicts
      if (bookingEnd === secondDate) {
        err.errors.bookingEnd = "End date conflicts with an existing booking";
      }

      return next(err);
    }
  }


  const updateBooking = await booking.update({
    startDate,
    endDate
  });

  res.json(updateBooking);
});


//*Delete a booking
//!DELETE
router.delete("/:bookingId", requireAuth, async(req,res,next)=>{
  const {bookingId} = req.params

  const user = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  const allowed = await Booking.findByPk(bookingId)
  if(allowed && allowed.userId !== req.user.id){
    const error = Error('This Action Is Forbidden')
    error.status = 403
    return next(error)
  }

  // const spot = await Spot.findOne({
  //   where:{
  //     ownerId:user.id
  //   }
  // })
const booking = await Booking.findOne({
  where:{
    id:bookingId,
    userId:user.id
  }
})
console.log(booking)
  if(!booking){
    const error = Error("Booking couldn't be found");
    error.status = 404;
    return next(error);
  }

  const dateNowCompare = new Date().getTime()
  let bookingStart = new Date(booking.startDate).getTime()

  if (bookingStart < dateNowCompare) {
    const err = Error("Bookings that have been started can't be deleted");
    err.status = 403;
    return next(err);
  }
  booking.destroy()
  res.json({
    message: "Successfully deleted",
    statusCode:200
  });
})
module.exports = router;
