var express = require('express');
var router = express.Router();
const path = require("path");
var multer = require('multer');

const mainController = require('../controllers/mainControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res) {
    res.render('contact', { title: 'Express' })
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'Express' })
});

router.get('/register', function(req, res) {
    res.render('register', { title: 'Express' })
});

router.post('/', mainController.createUser)

//router.get('/nuevoProducto', function(req, res) {
//  res.render('nuevoProducto', { title: 'Express' })
//});
/*
router.get('/producto', function(req, res) {
    res.render('producto', { title: 'Express' })
});*/
router.get('/agente', mainController.agente);
router.post('/agente/edit', mainController.createAgent);

router.get('/search', mainController.search);


module.exports = router;