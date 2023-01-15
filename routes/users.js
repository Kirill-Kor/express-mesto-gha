const router = require('express').Router();
const {getUsers, getUserById, createUser, patchUserInfo, patchUserAvatar} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', patchUserInfo);

router.patch('/me/avatar', patchUserAvatar);

module.exports = router;