const express = require('express');
const router = express.Router();

const { User,Image,Spot,Review } = require('../../db/models');
const { requireAuth} = require('../../utils/auth');


router.delete('/:imageId', requireAuth, async(req,res,next)=>{
  const {imageId} = req.params

const user = await User.findOne({
  where:{
    id:req.user.id
  }
  })

  const allowed = await Image.findByPk(imageId)
  if(allowed && allowed.imageableId !== req.user.id){
    const error = Error('This Action Is Forbidden')
    error.status = 403
    return next(error)
  }

  const image = await Image.findOne({
    where:{
      id:imageId
    }
  })

  let spot, review;
  if(image){
      spot = await Spot.findOne({
      where:{
        id:image.imageableId,
        onwerId:user.id

      }
    })

     review = await Review.findOne({
      where:{
        id:imageId.imageableId,
        userId: user.id
      }
    })
    image.destroy()
  res.json({
    message: "Successfully deleted",
    statusCode:200
  });

  }
if(!(spot || review)){
  const error = new Error("Image couldn't be found")
  error.status = 404
  return next(error)
}
})

module.exports = router;
