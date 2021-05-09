var express = require('express');
var router = express.Router();
const path = require("path");
var multer = require('multer');

const mainController = require('../controllers/mainControllers');
const uploadFile = multer({storage});
const usersController = require('../controllers/usersController');
const { fileName } = require('../controllers/usersController');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


/* GET home page. */
router.get('/', mainController.index);

router.get('/contact', function(req, res) {
    res.render('contact', { title: 'Express' })
});

router.get('/perfil', function (req, res) {
    res.render('perfil', { title: 'Express' })
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'Express' })
});

router.get('/register', function(req, res) {
    res.render('register', { title: 'Express' })
});

router.post('/agente',uploadFile.single('agente-img'), validations, mainController.createAgent);
router.get('/agente',guestMiddleware, mainController.agente);

router.get('/loginAgente', guestMiddleware , mainController.login);

router.post('/loginAgente', mainController.loginProcessAgente);




//router.get('/nuevoProducto', function(req, res) {
//  res.render('nuevoProducto', { title: 'Express' })
//});
/*
router.get('/producto', function(req, res) {
    res.render('producto', { title: 'Express' })
});*/

//router.post('/agente/edit', mainController.createAgent);

router.get('/search', mainController.search);




module.exports = router;