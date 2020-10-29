require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMiddleware } = require('./middlewares/error');

const { PORT = 3000, NODE_ENV, DATABASE_LINK } = process.env;

const router = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATABASE_LINK : 'mongodb://localhost:27017/explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   next();
// });

app.get('/test', (req, res) => {
  res.send('test successfully');
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
