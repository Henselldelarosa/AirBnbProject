const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Spot, Album, Comment, Playlist, Image } = require('../../db/models');
const router = express.Router();

// *GET all Spots
router.get('/', async(req,res)=>{
  const getAllSpots = await Spot.findAll()
  res.json(getAllSpots)
})

//* Get details of a Spot from an id


router.get('/:spotId', async(req,res)=>{
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
//subQuery:false

})

const owner = await User.findByPk(spot.ownerId)
const details = {
  ...spot,
// Image: spotImage,
Owner: owner
}
res.json(details)
} )
module.exports = router;
