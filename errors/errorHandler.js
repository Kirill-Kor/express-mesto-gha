const mongoose = require('mongoose');
const {
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_ID_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,

} = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_ID_MESSAGE });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_DATA_MESSAGE });
  }
  return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports = errorHandler;
