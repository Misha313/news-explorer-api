module.exports.errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;

  if (err.name === 'ValidationError') {
    return res.status(400).json({ err: `Ошибка валидации:${err.message}` });
  }

  if (err.name === 'MongoError' || err.code === 11000) {
    return res.status(409).send({ massage: 'Пользователь с такой почтой уже существет' });
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ message: err.message });
  }

  if (status === 401) {
    return res.status(401).send({ message: err.message });
  }

  if (status === 404) {
    return res.status(status).send({ message: err.message });
  }

  if (status === 500) {
    return res.status(status).send({ message: err.message });
  }

  res.status(status).json({ err: err.message });
  return next();
};
