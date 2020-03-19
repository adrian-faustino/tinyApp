const express = require('express');
router = express.Router();

// Database containing SHORT URL and LONG URL
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// for '/'
router.get('/', (req, res) => {
  res.send('Hello!');
});

router.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


// for '/urls'


// for '/urls/~'
router.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

module.exports = router;