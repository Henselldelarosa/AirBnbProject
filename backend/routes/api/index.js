// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser, requireAuth,setTokenCookie } = require('../../utils/auth.js');


// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// backend/routes/api/index.js
// ...

// fetch('/api/test', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": 'VkfxO5tE-iMTRgQ9IcKO5UjSJN6Tj7XlykXA'
//   },
//   body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));


const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'CaptainDeadPool'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});



router.use(restoreUser);



// ...

// GET /api/require-auth


// ...
// ...
module.exports = router;
