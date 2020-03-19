const express = require('express');
router = express.Router();

// Database containing SHORT URL and LONG URL
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//========= for '/'
router.get('/', (req, res) => {
  res.send('Hello!');
});

//========= for '/urls'
router.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});


//========= for '/urls/~'
router.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

router.get('/urls/:shortURL', (req, res) => {
  let templateVars = { 
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars);
});

module.exports = router;