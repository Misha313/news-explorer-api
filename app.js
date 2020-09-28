const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser } = require('./controllers/users')

const { PORT = 3000 } = process.env;

const articleRouter = require('./routes/articles');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signup', createUser);

app.use('/', articleRouter);

app.get('/', (req, res) => {
  res.send('запрашиваеммый ресурс не найден');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
