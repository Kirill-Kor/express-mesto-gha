const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers,
  getMyInfo,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)[www.]?\S+/),

  }),
}), patchUserAvatar);

module.exports = router;
