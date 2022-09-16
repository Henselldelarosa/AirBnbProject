const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User,Image } = require('../../db/models');
const router = express.Router();

router.get('/', requireAuth, async(req,res,next)=>{
const image = await Image.findAll()
res.json(image)
})
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

  if(!image){
    const error = Error("Image couldn't be found");
  error.status = 404;
  return next(error);
  }
image.destroy()
  res.json({
    message: "Successfully deleted",
    statusCode:200
  });
})

module.exports = router;
