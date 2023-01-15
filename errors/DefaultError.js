const mongoose = require('mongoose');

const {DEFAULT_ERROR, DEFAULT_ERROR_MESSAGE} = require('../utils/errors')

const DefaultErrorHandler = (error, req, res, next) => {
  res.status(DEFAULT_ERROR).send(DEFAULT_ERROR_MESSAGE);
}

module.exports = DefaultErrorHandler;