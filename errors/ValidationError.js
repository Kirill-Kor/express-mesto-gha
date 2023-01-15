const mongoose = require('mongoose');

const {INCORRECT_DATA_ERROR_CODE,INCORRECT_DATA_MESSAGE} = require('../utils/errors')

const ValidationErrorHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send(INCORRECT_DATA_MESSAGE);
  }
  else {
    next(error);
  }
}

module.exports = ValidationErrorHandler;