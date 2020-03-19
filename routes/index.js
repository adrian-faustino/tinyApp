const express = require('express');
const utils = require('../src/utils');
const router = express.Router();

// Databases
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

//========= for '/'
router.get('/', (req, res) => {
  res.send('Hello!');
});

//========= for '/urls'
router.get('/urls', (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user: users[req.cookies['user_id']]
  };
  
  res.render('urls_index', templateVars);
});

router.post('/urls', (req, res) => {
  const UID = utils.generateRandomString(6);
  const longURL = req.body.longURL;
  urlDatabase[UID] = longURL;
  urlDatabase['userID'] = UID;

  console.log('URL Database! ',urlDatabase);

  res.redirect(`/urls/${UID}`);
});


//========= for '/urls/~'
router.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

router.get('/urls/new', (req, res) => {
  if (users[req.cookies['user_id']] === undefined) {
    res.redirect('/login');
  }

  let templateVars = {
    user: users[req.cookies['user_id']]
  };
  res.render('urls_new', templateVars);
});

router.get('/urls/:shortURL', (req, res) => {
  let templateVars = { 
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies['user_id']]
  };
  res.render('urls_show', templateVars);
});

router.post('/urls/:newURL', (req, res) => {
  const key = req.params.newURL;
  const newURL = req.body.newURL;
  urlDatabase[key] = newURL;

  res.redirect('/urls');
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

//========= for '/login'
router.get('/login', (req, res) => {
  let templateVars = { user: 'existing'};
  res.render('urls_login', templateVars);
});

router.post('/login', (req, res) => {
  const userEmail = req.body.email;
  const userPass = req.body.password;

  for (let user in users) {
    if (!utils.checkValinObj(users[user], userEmail)) {
      console.log('User does not exist!');
      res.statusCode = 400;
      res.send(`Username or password is incorrect!`);
    } else if (users[user].password !== userPass) {
      console.log('Wrong password!');
      res.statusCode = 400;
      res.send(`Username or password is incorrect!`); 
    } else {
      res.cookie('user_id', users[user].id);
      res.redirect('/urls');
    }
  }
});

//========= for '/logout'
router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls');
});

//========= for '/register'
router.get('/register', (req, res) => {
  let templateVars = {
    user: 'registering'
  };
  res.render('urls_register', templateVars);
});

router.post('/register', (req, res) => {
  const userEmail = req.body.email;

  for (let user in users) {
    if (utils.checkValinObj(users[user], userEmail)) {
      res.status(400).send('E-mail already exists!');
    }
  }
  const userPass = req.body.password;
  const userID = utils.generateRandomString(5); // user ID length 5

  users[userID] = {
    id: userID,
    email: userEmail,
    password: userPass
  }

  res.cookie('user_id', userID);
  res.redirect('/urls');
});


module.exports = router;