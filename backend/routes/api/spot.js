const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup,validateSpot, validateReview,validateQuery } = require('../../utils/validation');
const { User, Spot,Booking, Image, Sequelize, Review, sequelize } = require('../../db/models');
const { raw } = require('express');
const e = require('express');
const router = express.Router();

// *Get all Spots
//!GET
 router.get('/', validateQuery, async(req,res)=>{
  const { Op } = require('sequelize')

  let page = Number(req.query.page);
  let size = Number(req.query.size);

  if (isNaN(page) || page <= 0) page = 0;
  if (isNaN(size) || size < 0) size = 20;

  if (page > 10) page = 0;
  if (size > 20) size = 20;


  const limit = size;
  const offset = size * (page - 1) >= 0 ? size * (page - 1) : 0;

  const where = {};

  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  if (minLat) where.lat = { [Op.gte]: Number(minLat) };
  if (maxLat) where.lat = { [Op.lte]: Number(maxLat) };
  if (minLng) where.lng = { [Op.gte]: Number(minLng) };
  if (maxLng) where.lng = { [Op.lte]: Number(maxLng) };
  if (minPrice) where.price = { [Op.gte]: Number(minPrice) };
  if (maxPrice) where.price = { [Op.lte]: Number(maxPrice) };


const spots = await Spot.findAll({
  include:{
    model:Image,
    attributes:[]
  },
  where,
  limit,
  offset
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

res.json({
  Spots:order,
  page,
  size
})
 })

//!GET
//* Get details of a Spot from an id
router.get('/:spotId', async(req,res,next)=>{
  const {spotId} = req.params
  const spots = await Spot.findByPk(spotId)
const spot = await Spot.findOne({
attributes:{exclude:["previewImage"]}
  // '*'
,
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
//!assign an order to your json object
let order = JSON.parse(JSON.stringify( image,
  ["id","imageableId","url"]));



const owner = await User.findByPk(spot.ownerId,{
  attributes:{exclude:["username","email","password","createdAt","updatedAt"]}
})
const details = {
  ...spot,
  ...reviews,
Images: order,
Owner: owner
}
res.json(details)
} )



//* Create a Spot
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


  //?return spot
  const returnNewSpot = await Spot.findByPk(newSpot.id)
  let order = JSON.parse(JSON.stringify( returnNewSpot,
    ["id","ownerId","address","city","state",
    "country","lat","lng","name","description",
    "price","createdAt","updatedAt"]));
  res.json(order)
})

//!PUT
//? Edit a spot
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
let order = JSON.parse(JSON.stringify( newUpdate,
  ["id","ownerId","address","city","state",
  "country","lat","lng","name","description",
  "price","createdAt","updatedAt"]));
return res.json(order)
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
    const error = Error("Spot couldn't be found");
    error.status = 404;
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
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // get spot from current user id
  const spotOwned = await Spot.findOne({
    where: {
      ownerId: user.id
    }
  });


  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  let bookings;


  if (!spotOwned) {
    bookings = await Booking.findAll({
      attributes:["spotId", "startDate","endDate"],
      where: {
        spotId
      }
    });
  } else {

    bookings = await Booking.findAll({
      attributes:["spotId", "startDate","endDate","createdAt","updatedAt"],
      where: {
        spotId
      },
      include:[
        {
          model: User,
          attributes:["id","firstName","lastName"]
      }
    ]
    });
  }

  res.json({
    Bookings: bookings
  });
});


let user;

const authorization = async (req, res, next) => {
  user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  next();
}
// *Create a Booking from a Spot based on the Spot's id
//!POST

router.post('/:spotId/bookings', requireAuth,authorization, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // deconstruct request body
  const {
    startDate,
    endDate
  } = req.body;



  // get spot
  const spot = await Spot.findByPk(spotId);


  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spot.ownerId === user.id) {
    const error = Error("Spot must NOT belong to the current user");
    return next(error);
  }


  if (endDate <= startDate) {
    const err = Error("Validation error");
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot be on or before startDate"
    };
    return next(err);
  }

  const findBooking = await Booking.findOne({
    where: {
      spotId,
      userId: user.id,
    }
  });

  if (findBooking) {
    // set comparison start/end date variable for comparing with request body date
    const startDateCompare = findBooking.startDate.toISOString().split('T')[0];
    const endDateCompare = findBooking.endDate.toISOString().split('T')[0];

    // if booking start date or end date exist with given dates
    if (startDateCompare === startDate || endDateCompare === endDate) {
      const err = Error("Sorry, this spot is already booked for the specified dates");
      err.status = 403;
      err.errors = {};

      // start date conflicts
      if (startDateCompare === startDate) {
        err.errors.startDate = "Start date conflicts with an existing booking";
      }

      // end date conflicts
      if (endDateCompare === endDate) {
        err.errors.endDate = "End date conflicts with an existing booking";
      }

      return next(err);
    }
  }

  // create booking with given request time
  const booking = await Booking.create({
    spotId,
    userId: user.id,
    startDate,
    endDate
  });


  res.json(booking);
});

module.exports = router;
