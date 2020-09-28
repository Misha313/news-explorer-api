const articleRouter = require('express').Router();
const { createArticle, deleteArticleById } = require('../controllers/articles');

articleRouter.post('/articles', createArticle);
articleRouter.delete('/articles/:articleId', deleteArticleById);

module.exports = articleRouter;
