const userRouter = require('express').Router();
const { createUser, login, showMyInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { createUserCheck, loginCheck } = require('../middlewares/validation');

userRouter.post('/signup', createUserCheck, createUser);
userRouter.post('/signin', loginCheck, login);
userRouter.get('users/me', auth, showMyInfo);

module.exports = userRouter;
