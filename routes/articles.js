const articleRouter = require('express').Router();
const { createArticle, deleteArticleById, getArticles } = require('../controllers/articles');
const auth = require('../middlewares/auth');
const { createArticleCheck, articleIdCheck } = require('../middlewares/validation');

articleRouter.post('/articles', auth, createArticle);
articleRouter.delete('/articles/:articleId', auth, deleteArticleById);
articleRouter.get('/articles', auth, getArticles);

module.exports = articleRouter;
