const mongoose = require('mongoose');

const { INCORRECT_DATA_ERROR_CODE, INCORRECT_ID_MESSAGE } = require('../utils/errors');

const IncorrectIdSearch = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_ID_MESSAGE });
  }
  next(error);
};

module.exports = IncorrectIdSearch;
