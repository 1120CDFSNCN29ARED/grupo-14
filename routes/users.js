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

const validation = [
    body('name').notEmpty().withMessage('tienes que escribir un nombre').bail(),
    body('lastname').notEmpty().withMessage('tienes que escribir un apellido').bail(),
    body('email').notEmpty().withMessage('tienes que escribir un correo electronico').bail(),
    body('dni').notEmpty().withMessage('tienes que escribir un dni').bail(),
    body('password').notEmpty().withMessage('tienes que escribir una contraseña').bail(),
    body('password2').notEmpty().withMessage('confirmar la contraseña').bail(),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('tienes que subir una imagen');
        }
        else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitdas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]


router.get('/register', usersController.register);

router.post('/register',uploadFile.single('avatar'), validation, usersController.processRegister);

router.get('/login', usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/profile/:userId', usersController.profile);

module.exports = router;
