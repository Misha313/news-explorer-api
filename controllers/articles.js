const Article = require('../models/article');

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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article.findByIdAndRemove(articleId)
    .then((article) => {
      if (!article) {
        res.status(400).send({ message: 'Карточка с данным ID не найдена' });
        return;
      }
      res.status(200).send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: err });
    });
};
