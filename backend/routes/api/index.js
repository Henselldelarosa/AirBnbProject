// backend/routes/api/index.js
// const router = require('express').Router();
const router = require('express').Router();;

const sessionRouter = require('./session.js');
const bookigRouter = require('./booking')
const usersRouter = require('./users.js');
const imageRouter = require('./image')
const spotRouter = require('./spot.js')
const userRouter = require('./user')

const reviewRouter = require('./reviews')
const { restoreUser} = require('../../utils/auth.js');


router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imageRouter)
router.use('/spots', spotRouter)
router.use('/user', userRouter)

router.use('/reviews', reviewRouter)
router.use('/bookings', bookigRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
module.exports = router;
