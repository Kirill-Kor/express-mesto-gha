const { DEFAULT_ERROR, DEFAULT_ERROR_MESSAGE } = require('../utils/errors');

const DefaultErrorHandler = (error, req, res, next) => {
  res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
  next();
};

module.exports = DefaultErrorHandler;
