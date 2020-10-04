const router = require('express').Router();
const articleRouter = require('./articles');
const userRouter = require('./user');
const NotFoundError = require('../errors/not-found-err');

router.use(articleRouter);
router.use(userRouter);

router.use((req, res, next) => next(new NotFoundError('запрашиваеммый ресурс не найден')));

module.exports = router;
