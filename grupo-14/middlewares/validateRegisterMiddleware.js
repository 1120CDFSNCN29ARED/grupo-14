const path = require('path');
const {body} = require('express-validator');

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
];

module.exports = validation;