// backend/routes/api/index.js
const router = require('express').Router();

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
module.exports = router;
