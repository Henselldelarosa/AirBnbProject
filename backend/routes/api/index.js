// backend/routes/api/index.js
// const router = require('express').Router();
const router = require('express').Router();;

const sessionRouter = require('./session.js');
const bookigRouter = require('./booking')
const usersRouter = require('./users.js');
const imageRouter = require('./image')
const spotRouter = require('./spot.js')
const userRouter = require('./user')
const newRouter = require('./new')
const reviewRouter = require('./reviews')
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');




// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'CaptainDeadPool'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imageRouter)
router.use('/spots', spotRouter)
router.use('/user', userRouter)
router.use('/new', newRouter)
router.use('/reviews', reviewRouter)
router.use('/bookings', bookigRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
module.exports = router;
