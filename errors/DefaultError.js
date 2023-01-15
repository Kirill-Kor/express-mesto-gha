const { DEFAULT_ERROR, DEFAULT_ERROR_MESSAGE } = require('../utils/errors');

const DefaultErrorHandler = (error, req, res) => {
  res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports = DefaultErrorHandler;
