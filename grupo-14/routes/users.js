var express = require('express');
const path = require("path");
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs')
const User = require('fs');
const { body } = require('express-validator');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const uploadFile = multer({storage});
const usersController = require('../controllers/usersController');
const { fileName } = require('../controllers/usersController');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/register',guestMiddleware ,  usersController.add);

router.post('/register',uploadFile.single('avatar'), validations, usersController.create);

router.get('/login', guestMiddleware , usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/profile/', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

router.get('/api',usersController.passEmails);

module.exports = router;
