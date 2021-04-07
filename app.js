var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//routas
var indexRouter = require('./routes/index');
var productRouter = require('./routes/producto');
var userRouter = require('./routes/users');
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


//app.listen(3001);

// view engine setup


app.use(methodOverride('_method'));
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


/*app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/reservas.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/contact.html"));
});
app.get("/producto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/producto.html"));
});*/

module.exports = app;