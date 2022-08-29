const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Spot, Album, Comment, Playlist, Image, Sequelize, Review } = require('../../db/models');
const router = express.Router();

// *GET all Spots
router.get('/', async(req,res)=>{
  const getAllSpots = await Spot.findAll()
  return res.json({Spots:getAllSpots})
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


//* CREATE new Spot
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
    const error = Error('This Action Is Forbidden')
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
  message: "Successfully deleted"
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
    owner:user.id
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
res.json(imageCreate)
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
const validateReview = [
  check('review')
  .exists({checkFalsy:true})
  .withMessage("Review text is required"),
  check('stars')
  .exists({checkFalsy:true})
  .isFloat({min:1, max:5})
  .withMessage("Stars must be an integer from 1 to 5")
]

router.post('/:spotId/reviews', [requireAuth, validateReview],async(req,res,next)=>{
  const {spotId} = req.params
  const { user } = req;

  const spot = await Spot.findOne({
    where:{
      id:spotId
    }
  })
//?check if the spot exists
  if(!spot){
    if(!spot){
      const error = Error("Spot couldn't be found");
      error.status = 404;
      return next(error);
    }
  }

  //?get current user
  const users = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  //?Error response: Review from the current user already exists for the Spot
const findReview = await Review.findOne({
  where:{
    id:users.id
  }
})
//?checks if the user already has a review
if(findReview){
  const error = Error("User already has a review for this spot")
  error.status = 403
  return next(error)
}
console.log(user.dataValues.id, "daddada")
//console.log(users)
const{
  review,
  stars
} = req.body
const newReview = await Review.create({
  id:user.dataValues.id,
  spotId,
  review,
  stars
})
res.json(newReview)
})

module.exports = router;
