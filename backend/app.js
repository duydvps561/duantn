const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const database = require('./config/db');

const indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var ContactRouter = require('./routes/Contacts');
var FoodRouter = require('./routes/food');
var TaikhoanRouter = require('./routes/taikhoan');
var HoadonRouter = require('./routes/hoadon');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

database.connect();

app.use('/', indexRouter);
app.use('/test', testRouter)
app.use('/lienhe', ContactRouter);
app.use('/foods', FoodRouter);
app.use('/taikhoan', TaikhoanRouter);
app.use('/hoadon', HoadonRouter);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500);
    res.render('error');
  } else {
    res.status(err.status || 500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = app;
