const Card = require('../models/card');

const {NOT_FOUND_STATUS_CODE, NOT_FOUND_CARD_MESSAGE} = require('../utils/errors')

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})
    res.send(cards);
  }
  catch (error) {
    next(error);
  }
}

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user })
    res.send(card);
  }
  catch (error) {
    next(error);
  }
}

const deleteCard = async (req, res, next) => {
  const card = await Card.findByIdAndRemove(req.params.cardId);
  if (card === null) {
    res.status(NOT_FOUND_STATUS_CODE).send(NOT_FOUND_CARD_MESSAGE);
  }
  res.send(card);
}

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    if (card === null) {
      res.status(NOT_FOUND_STATUS_CODE).send(NOT_FOUND_CARD_MESSAGE);
    }
    res.send(card);
  }
  catch (error) {
    next(error);
  }
}

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    if (card === null) {
      res.status(NOT_FOUND_STATUS_CODE).send(NOT_FOUND_CARD_MESSAGE);
    }
    res.send(card);
  }
  catch (error) {
    next(error);
  }
}
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}