const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Spot, Album, Comment, Playlist } = require('../../db/models');
const router = express.Router();

// *GET all Spots
router.get('/', async(req,res)=>{
  const getAllSpots = await Spot.findAll()
  res.json(getAllSpots)
})

//* Get details of a Spot from an id
router.get('/:id', async(req,res)=>{
  const {id} = req.params
const spot = await Spot.findOne({
attributes:[
  '*'
],
where:{
  id:id
},
raw:true

})
const owner = await User.findByPk(spot.ownerId)
const details = {
  ...spot,

Owner: owner
}
res.json(details)
} )
module.exports = router;
