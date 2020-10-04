const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login, showMyInfo } = require('./controllers/users');
const { getArticles } = require('./controllers/articles');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const articleRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users/me', showMyInfo);
app.use('/articles', getArticles);
app.use('/', articleRouter);

app.get('/', (req, res) => {
  res.send('запрашиваеммый ресурс не найден');
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
