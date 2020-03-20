const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['user_id', 'email']
}));
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;