const User = require('../models/user');

const { NOT_FOUND_STATUS_CODE, NOT_FOUND_USER_MESSAGE } = require('../utils/errors');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user === null) {
      res.status(NOT_FOUND_STATUS_CODE).send({ message: NOT_FOUND_USER_MESSAGE });
    } else res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const patchUserInfo = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      res.status(NOT_FOUND_STATUS_CODE).send({ message: NOT_FOUND_USER_MESSAGE });
    } else res.send(user);
  } catch (error) {
    next(error);
  }
};

const patchUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      res.status(NOT_FOUND_STATUS_CODE).send({ message: NOT_FOUND_USER_MESSAGE });
    } else res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
};
