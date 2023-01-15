const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const ValidationErrorHandler = require('./errors/ValidationError');
const DefaultErrorHandler = require('./errors/DefaultError');
const IncorrectIdSearch = require('./errors/CastError');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb ');
mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63c297b30d78980df4d2faf8',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(ValidationErrorHandler);
app.use(IncorrectIdSearch);
app.use(DefaultErrorHandler);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница с таким адресом не существует' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
