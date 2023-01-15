const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards');
const bodyParser = require('body-parser');
const ValidationErrorHandler = require('./errors/ValidationError.js');
const DefaultErrorHandler = require('./errors/DefaultError.js');
const {PORT=3000} = process.env;



const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb ');
mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63c297b30d78980df4d2faf8'
  };

  next();
})

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(ValidationErrorHandler);
app.use(DefaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
