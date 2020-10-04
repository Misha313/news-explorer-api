const userRouter = require('express').Router();
const { showMyInfo } = require('../controllers/users');

userRouter.get('users/me', showMyInfo);

module.exports = userRouter;
