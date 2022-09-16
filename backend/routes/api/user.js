const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup, validateLogin} = require('../../utils/validation');
const { User, Booking, Image, Spot, Review } = require('../../db/models');
const router = express.Router();

//* GET all Spots owned by the Current User
//todo add avg Rating
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
for(let spot of spots){
  const {id} = spot

  const reviews = await Review.findAll({
    where:{
      spotId:id
    }
  })

  const eachReview = reviews.length

  let ratings = 0
   reviews.forEach((ele)=>{
    if(ele.stars){
      ratings += ele.stars
    }
   })

   const avgRating = ratings/eachReview

   spot.dataValues.avgRating = avgRating

}
let order = JSON.parse(JSON.stringify( spots,
  ["id","ownerId","address","city","state",
  "country","lat","lng","name","description",
  "price","createdAt","updatedAt","avgRating","previewImage"]));
res.json({Spots:order})
})

router.get('/',[restoreUser, requireAuth], async(req,res)=>{
const currentUser = await User.getCurrentUserById(req.user.id)
return res.json({
  id:currentUser.id,
  firstName:currentUser.firstName,
  lastName:currentUser.lastName,
  email:currentUser.email,
  username:currentUser.username
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
      model:User,
      attributes:["id", "firstName","lastName"]
    },
    {
      model:Spot,
      attributes:["id","ownerId","address","city","state","country","lat","lng","name","price"]
    },
    {
      model:Image,
      attributes: JSON.parse(JSON.stringify(
        ["id","imageableId","url"]))
    }
  ],
})
res.json({Reviews:reviews})
})

//*Get all of the Current User's Bookings
//!GET
router.get('/bookings', [restoreUser, requireAuth], async (req, res, next) => {
  // get bookings from user id

//   const bookings = await Booking.findAll({
//     where: {
//       userId: req.user.id,
//     },
//     include:[
//       {
//         model:Spot.scope("booking")
//       },
//     ],
//     attributes:["id","spotId"],
//   });

//   const booking = await Booking.findAll({
//     where: {
//       userId: req.user.id,
//     },
//     attributes:{exclude:['id', 'spotId']
//   },
//   })

//   const allBook = bookings.concat(booking)

// let ray = []
// ray.push(allBook)
//// const spots = await Spot.findAll({
////   include:{
////     model:Booking,
////     attributes:["id","spotId"]
////   }
//// })
// const booking = await Booking.findAll({
//   attributes:["userId", "startDate", "endDate", "createdAt", "updatedAt"],
//   where:{
//     userId:req.user.id
//   },
// })
// const user = await
const booking = await Booking.findAll({
  attributes:[
    "id","spotId","userId","startDate".split(" ")[0],"endDate","createdAt","updatedAt"],
  where:{
    userId:req.user.id,
  },
  //attributes:["id", "spotId"],
  include:{
    model:Spot,
    attributes:JSON.parse(JSON.stringify(
      ["address","city","state",
      "country","lat","lng","name",
      "price","previewImage"]))
  },
//   require:true,
//   attributes:["id",'spotId'],
//   attributes:["userId", "startDate", "endDate", "createdAt", "updatedAt"].join(""),
//  // raw:true

})

const bookings = await Booking.findAll({
  where:{
    userId:req.user.id,
  },
  attributes:["userId", "startDate", "endDate", "createdAt", "updatedAt"]
})

let order = JSON.parse(JSON.stringify( booking,
  ["id","spotId","address","city","state",
  "country","lat","lng","name",
  "price","previewImage","userId","startDate",
  "endDate","createdAt","updatedAt"]));
// bookings.push(booking)
res.json(booking)
});
module.exports = router
