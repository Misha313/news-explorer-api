const Article = require('../models/article');

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, owner: req.user._id, link, image })
    .then((article) => res.send(article))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article.findByIdAndRemove(articleId)
    .then((article) => {
      if (!article) {
        return res.status(400).send({ message: 'Карточка с данным ID не найдена' });
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
