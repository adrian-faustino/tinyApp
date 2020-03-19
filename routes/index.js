const express = require('express');
const randomString = require('../src/utils');
const router = express.Router();

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

router.post('/urls', (req, res) => {
  const UID = randomString(6);
  const longURL = req.body.longURL;
  urlDatabase[UID] = longURL;
  
  res.redirect(`/urls/${UID}`);
});


//========= for '/urls/~'
router.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

router.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

router.get('/urls/:shortURL', (req, res) => {
  let templateVars = { 
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars);
});

//========= for '/u/~'
router.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];console.log(longURL);

  res.redirect(longURL);
});

//========= for '/u/~/delete'
router.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

module.exports = router;