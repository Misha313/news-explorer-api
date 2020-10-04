const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    source,
    text,
    date,
    link,
    image,
    owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article.findByIdAndRemove(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('статья с данным id не найдена');
      }
      res.status(200).send({ data: article });
    })
    .catch(next);
};
