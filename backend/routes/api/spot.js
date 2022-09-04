const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup,validateSpot, validateReview } = require('../../utils/validation');
const { User, Spot,Booking, Image, Sequelize, Review, sequelize } = require('../../db/models');
const { raw } = require('express');
const e = require('express');
const router = express.Router();

// *GET all Spots
//!GET
 router.get('/', async(req,res)=>{

const spots = await Spot.findAll()

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

res.json({Spot:spots,
  id:spots.id,
  ownerId: spots.ownerId,
  address: spots.address,
  city: spots.city,
  state:spots.state,
  country: spots.country,
  lat: spots.lat,
  lng: spots.lng,
  name: spots.name,
  description: spots.description,
  price: spots.price,
  createdAt: spots.createAt,
  updatedAt: spots.updatedAt,
  avgRating: spots.avgRating,
  previewImage: spots.previewImage
})
 })

//!GET
//* Get details of a Spot from an id
router.get('/:spotId', async(req,res,next)=>{
  const {spotId} = req.params
  const spots = await Spot.findByPk(spotId)
const spot = await Spot.findOne({
attributes:[
  '*'
],
where:{
  id: spotId
},
raw:true,

})
// Error response: Couldn't find a Spot with the specified id
if (!spot) {
  const err = Error("Spot couldn't be found");
  err.status = 404;
  return next(err);
}

const reviews = await Review.findOne({
  where:{
    spotId
  },
   attributes:[
     [Sequelize.fn('COUNT', Sequelize.col('stars')), 'numReviews'],
     [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('stars')), 1), 'avgStarRating'],
  ],
  raw: true
})

const image = await Image.findAll({
  where:{
    imageableId: spotId
  }
})



const owner = await User.findByPk(spot.ownerId)
const details = {
  ...spot,
  ...reviews,
Image: image,
Owner: owner
}
res.json(details)
} )



//* CREATE a Spot
//!Post
router.post('/', [restoreUser,requireAuth,validateSpot], async(req,res)=>{

  // destructor the spot body
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body

  const user = await User.findOne({
    where:{
      id: req.user.id
    }
  })
  // const allSpots = await Spot.findAll()
  // console.log(allSpots.length, "allSpots")
  //?create a Spot
  const newSpot = await Spot.create({
    // id:allSpots.length,
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  console.log("newSpot", newSpot);

  //?return spot
  const returnNewSpot = await Spot.findByPk(newSpot.id)
  res.json(returnNewSpot)
})

//!PUT
//? eddit a spot
router.put('/:spotId',[restoreUser,requireAuth,validateSpot], async(req,res,next)=>{
  const { spotId}  = req.params

  //given body to modify the spot
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const allowed = await Spot.findByPk(spotId)

  //handles not the owner error
  if(allowed && allowed.ownerId !== req.user.id){
    const error = Error('Forbidden')
    error.status = 403
    return next(error)
  }

  //gets current user
  const currentUser = await User.findOne({
    where:{
      id: req.user.id
    }
  })

  const spot = await Spot.findOne({
  where:{
    id: spotId,
    ownerId: currentUser.id
  }
})

if (!spot) {
  const error = Error("Spot couldn't be found");
  error.status = 404;
  return next(error);
}


const editedSpot = await spot.update(
  {
  address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
})
const newUpdate = await Spot.findByPk(editedSpot.id)
return res.json(newUpdate)
})

//!DELETE
//* delete a spot
router.delete('/:spotId',[restoreUser,requireAuth], async(req,res,next)=>{
const {spotId} = req.params


//gets current user
const currentUser = await User.findOne({
  where:{
    id: req.user.id
  }
})

const allowed = await Spot.findByPk(spotId)
//handles not the owner error
if(allowed && allowed.ownerId !== req.user.id){
  const error = Error('This Action Is Forbidden')
  error.status = 403
  return next(error)
}


  const spot = await Spot.findOne({
  where:{
    id: spotId,
    ownerId: currentUser.id
  }
})

if (!spot) {
  const error = Error("Spot couldn't be found");
  error.status = 404;
  return next(error);
}
spot.destroy()
res.json({
  message: "Successfully deleted",
  statusCode:200
});

})

//*Add an Image to a Spot based on the Spot's id
//!POST
router.post('/:spotId/images',requireAuth,async(req,res,next)=>{
const {spotId} = req.params

const {url} = req.body

const user = await User.findOne({
  where:{
    id:req.user.id
  }
})

const allowed = await Spot.findByPk(spotId)

if (allowed && allowed.ownerId !== req.user.id) {
  const error = Error("Forbidden");
  error.status = 403;
  return next(error);
}
//?checks if the person owns the spot
const spot = await Spot.findOne({
  where:{
    id:spotId,
    ownerId:user.id
  }
})
//?makes sure the spot exists
if(!spot){
  const error = Error("Spot couldn't be found");
  error.status = 404;
  return next(error);
}
//? adds an Image
const addUrl = await spot.createImage({
  url
})

const create = await Image.findByPk(addUrl.id)
res.json(create)
})

//*Get all Reviews by a Spot's id
//!GET
router.get('/:spotId/reviews', async(req,res,next)=>{
  const {spotId} = req.params

  const spot = await Spot.findOne({
    where:{
      id:spotId
    }
  })
  if(!spot){
    if(!spot){
      const error = Error("Spot couldn't be found");
      error.status = 404;
      return next(error);
    }
  }
  const reviews = await Review.findAll({
    where:{
      spotId
    },
    include:[
      {
      model:User,
    }
  ],
  exclude:["username"]
  })

for (let review of reviews){
  const image = await Image.findAll({
    where:{
      imageableId:review.id
    }
  })
  const images = []

  image.map(el =>{
    const eachImage = {
      ...el.dataValues
    }
    images.push(eachImage)
  })
  review.dataValues['Images'] = images
}

res.json({Reviews:reviews})
})


//*Create a Review for a Spot based on the Spot's id
//!POST
router.post('/:spotId/reviews', [requireAuth, validateReview],async(req,res,next)=>{
  const {spotId} = req.params
  const{
    review,
    stars
  } = req.body

  //?get current user
  const user = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  const spot = await Spot.findByPk(spotId)
  //?check if the spot exists
  if(!spot){
    error.status = 404;
    const error = Error("Spot couldn't be found");
    return next(error);

  }



  //?Error response: Review from the current user already exists for the Spot
const findReview = await Review.findOne({
  where:{
    id:user.id
  }
})
//?checks if the user already has a review
if(findReview){
  const error = Error("User already has a review for this spot")
  error.status = 403
  return next(error)
}

const newReview = await Review.create({
  userId: user.id,
  spotId,
  review,
  stars
})
res.json(newReview)
})

//*Get all Bookings for a Spot based on the Spot's id
//!GET
router.get('/:spotId/bookings', [restoreUser, requireAuth], async (req, res, next) => {
const {spotId} = req.params

//? get the current user
const user = await User.findOne({
  where:{
    id: req.user.id
  }
})

//?get spots onwed by the current user
const spotOwned = await Spot.findOne({
  where:{
    OwnerId: user.id
  }
})

const spot = await Spot.findByPk(spotId)
//? if the spot couldn't be found
if(!spot){
  const error = Error("Spot couldn't be found")
  error.status = 404
  return next(error)
}

//? if the current spot is not owned by the current user
let bookings;
if(!spotOwned){
bookings = await Booking.findAll({
  attributes:["spotId","startDate","endDate"],
  where:{
    spotId
  }
})

}
else{
  bookings = await Booking.findAll({
    where:{
      spotId
    },
    include:{
      model:User,
      attributes:["id","firstName","lastName"]
    },

  })
}
res.json({Bookings:bookings})

});



module.exports = router;
