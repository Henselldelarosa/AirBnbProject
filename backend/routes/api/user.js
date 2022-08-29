const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Booking, Image, Spot, Review } = require('../../db/models');
const router = express.Router();

//* GET all Spots owned by the Current User
router.get('/spots', [restoreUser, requireAuth], async(req,res)=>{
const getUser = await User.findOne({
  where:{
    id:req.user.id
  }
})
const spots = await Spot.findAll({
  where:{
    ownerId:req.user.id
  }
})
res.json({Spots:spots})
})

router.get('/',[restoreUser, requireAuth], async(req,res)=>{
const currentUser = await User.getCurrentUserById(req.user.id)
return res.json({
  id:currentUser.id,
  firstName:currentUser.firstName,
  lastName:currentUser.lastName,
  email:currentUser.email
})
})

//*Get all Reviews of the Current User
//!GET
router.get('/reviews',[restoreUser,requireAuth], async(req,res,next)=>{
const reviews = await Review.findAll({
  where:{
    userId:req.user.id
  },
  include:[
    {
      model:User
    }
  ]
})
res.json({reviews})
})

//*Get all of the Current User's Bookings
//!GET
router.get('/user/bookings', [restoreUser,requireAuth], async(req,res,next)=>{
  
})
module.exports = router
