const express = require('express');
router = express.Router();

// Database containing SHORT URL and LONG URL
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

router.get('/', (req, res) => {
  res.send('Hello!');
});



module.exports = router;