require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Joi, celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { NOT_FOUND_STATUS_CODE, NOT_FOUND_PAGE } = require('./utils/errors');
const errorHandler = require('./errors/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
mongoose.set('strictQuery', false);

const allowedCors = [
  'https://kirkors.mesto.nomoredomains.work',
  'http://kirkors.mesto.nomoredomains.work',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { host } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.uncludes(host)) {
    res.header('Access-Control-Allow-Origin', host);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .min(2),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)[www.]?\S+/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .min(2),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_PAGE));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
