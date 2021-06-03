const path = require('path');
const {body} = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('tienes que escribir un nombre'),
    body('lastname').notEmpty().withMessage('tienes que escribir un apellido'),
    body('email').notEmpty().withMessage('tienes que escribir un correo electronico'),
    body('dni').notEmpty().withMessage('tienes que escribir un dni'),
    body('password').notEmpty().withMessage('tienes que escribir una contraseña'),
    body('password2').notEmpty().withMessage('confirmar la contraseña'),
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

module.exports = validations;