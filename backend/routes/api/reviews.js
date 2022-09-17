const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup,validateReview } = require('../../utils/validation');
const { User, Review,Image } = require('../../db/models');
const router = express.Router();


// router.get('/', async(req,res,next)=>{
//   const review = await Review.findAll()
//   res.json(review)
// })


router.get('/current',[restoreUser,requireAuth], async(req,res,next)=>{
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

//*Add an Image to a Review based on the Review's id
//!POST
router.post("/:reviewId/images",requireAuth,async(req,res,next)=>{
  const{reviewId} = req.params

  const {url} = req.body
  const user = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  const review = await Review.findOne({
    where:{
      id:reviewId,
      userId:user.id
    }
  })
  const allowed = await Review.findByPk(reviewId)

  if (allowed && allowed.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  if(!review){
    const error = new Error("Review couldn't be found")
    error.satus = 404
    return next(error)
  }

  const images = await Image.findAll({
    where:{
      imageableId: reviewId
    }
  })

  if (images.length >= 10){
    const error = Error("Maximum number of images for this resource was reached")
    error.status = 400
    return next(error)
  }


  const image = await review.createImage({
    url
  })
  const newImage = await Image.findByPk(image.id)
  res.json(newImage)

})

//*Edit a Review
//!PUT
router.put('/:reviewId', [requireAuth,validateReview], async(req, res,next)=>{
  const {reviewId} = req.params
  const reviews = await Review.findByPk(reviewId)

  const user = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  if(!reviews){
    const error = Error("Review could not be found")
    error.status = 404
    return next(error)
  }

  const findAReview = await Review.findOne({
    where:{
      id:reviewId,
      userId: user.id
    }
  })

  if(!findAReview){
    const error = Error("Forbidden")
    error.satus = 403
    return next(error)
  }
const{
  review,
  stars
} = req.body
  const editReview = await findAReview.update({
    review,
    stars
  })
  res.json(editReview)
})


//*Delete a Review
//!DELETE
router.delete('/:reviewId', requireAuth, async(req,res,next)=>{
  const {reviewId} = req.params
  const user = await User.findOne({
    where:{
      id:req.user.id
    }
  })

  const allowed = await Review.findByPk(reviewId)
  if(allowed && allowed.userId !== req.user.id){
    const error = Error('Forbidden')
    error.satus = 403
    return next(error)
  }

  const review = await Review.findOne({
    where:{
      id:reviewId,
      userId:user.id
    }
  })
  if(!review){
    const error = Error("Review couldn't be found");
    error.status = 404;
    return next(error);
  }
  review.destroy()
res.json({
  messsage:"Successfully deleted",
  statusCode:res.statusCode
})

})
module.exports = router;
