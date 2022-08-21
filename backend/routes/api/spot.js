const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Spot, Album, Comment, Playlist, Image, Sequelize, Review } = require('../../db/models');
const router = express.Router();

// *GET all Spots
router.get('/', async(req,res)=>{
  const getAllSpots = await Spot.findAll()
  res.json(getAllSpots)
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
router.post('/', restoreUser,requireAuth,validateSpot, async(req,res)=>{

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
  //?create a Spot
  const newSpot = await Spot.create({
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

  //?return spot
  const returnNewSpot = await Spot.findByPk(newSpot.id)
  res.json(returnNewSpot)
})

//!PUT
router.put('/:spotId',restoreUser,requireAuth,validateSpot, async(req,res,next)=>{
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


module.exports = router;
