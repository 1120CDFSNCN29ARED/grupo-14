var express = require('express');
var router = express.Router();
const path = require("path");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})


const mainController = require('../controllers/mainControllers');
const uploadFile = multer({ storage: storage});
const usersController = require('../controllers/usersController');
const { fileName } = require('../controllers/usersController');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


/* GET home page. */
router.get('/', mainController.index);

router.get('/contact', function(req, res) {
    res.render('contact', { title: 'Express' , user : req.session.userLogged }
    )
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

router.get('/reservasAgente', function(req,res) {
    res.render('reservasAgente', { title: 'Express' })
});

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