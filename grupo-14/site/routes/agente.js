var express = require('express');
const path = require("path");
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs')
const Agent = require('fs');
const { body } = require('express-validator');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/agentes');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const uploadFile = multer({ storage });
const agentsController = require('../controllers/agentsController');
const { fileName } = require('../controllers/agentsController');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/register', guestMiddleware, agentsController.add);

router.post('/register', uploadFile.single('avatar'), validations, agentsController.create);

router.get('/loginAgente', guestMiddleware, agentsController.login);

router.post('/loginAgente', agentsController.loginProcess);

router.get('/profile/', authMiddleware, agentsController.profile);

router.get('/logout', agentsController.logout);

module.exports = router;
