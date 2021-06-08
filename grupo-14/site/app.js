var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var productRouter = require('./routes/producto');
var userRouter = require('./routes/users');
var agenteRouter = require('./routes/agente');
var reservasRouter = require('./routes/reserva');
var apiRouter = require('./routes/api');
const methodOverride = require('method-override');
const session = require('express-session');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

var app = express();


app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));


app.use(userLoggedMiddleware);


app.use(methodOverride('_method'));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/producto', productRouter);
app.use('/user', userRouter);
app.use('/agente', agenteRouter);
app.use('/reservas', reservasRouter);
app.use('/api', apiRouter);



app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;