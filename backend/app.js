const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const database = require('./config/db');

const indexRouter = require('./routes/index');
var ContactRouter = require('./routes/Contacts');
//account
var TaikhoanRouter = require('./routes/account/taikhoan');
var RegisterRouter = require('./routes/account/register');
//food
var FoodRouter = require('./routes/food/food');
var FoodOderRouter = require('./routes/food/foododer');
var HoadonRouter = require('./routes/food/hoadon');
//movie
var PhimRouter = require('./routes/movie/phim');
var PhimtheloaiRouter = require('./routes/movie/phimtheloai');
var TheloaiRouter = require('./routes/movie/theloai');
//room
var GheRouter = require('./routes/room/ghe');
var LoaigheRouter = require('./routes/room/loaighe');
var GiagheRouter = require('./routes/room/giaghe');
var LoaiphongRouter = require('./routes/room/loaiphong');
var PhongchieuRouter = require('./routes/room/phongchieu');
//ticket
var CachieuRouter = require('./routes/ticket/cachieu');
var VeRouter = require('./routes/ticket/ve');
//
var TintucRouter = require('./routes/tintucs');
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
// truy cập lần đầu 
app.use('/', indexRouter);
/////////////////
//account
app.use('/taikhoan', TaikhoanRouter);
app.use('/register', RegisterRouter);
//food
app.use('/food', FoodRouter);
app.use('/foododer', FoodOderRouter);
app.use('/hoadon', HoadonRouter);
//movie
app.use('/phim', PhimRouter);
app.use('/phimtheloai', PhimtheloaiRouter);
app.use('/theloai', TheloaiRouter);
//room
app.use('/ghe', GheRouter);
app.use('/loaighe', LoaigheRouter);
app.use('/giaghe', GiagheRouter);
app.use('/loaiphong', LoaiphongRouter);
app.use('/phongchieu', PhongchieuRouter);
//ticket
app.use('/xuatchieu', CachieuRouter);
app.use('/ve', VeRouter);
///
app.use('/lienhe', ContactRouter);
app.use('/tintuc', TintucRouter);
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
