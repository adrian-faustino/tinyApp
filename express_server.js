const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;