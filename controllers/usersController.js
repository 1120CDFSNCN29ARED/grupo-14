const { validationResult } = require('express-validator');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        

        if (resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);
        
        if (userInDB) {
            return res.render('register',{
                errors: {
                    email: {
                        msg: 'este email ya esta registardo'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate);
        return res.redirect('/user/login');
    },

    login: (req,res) => {
        
        return res.render('login');
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        
        if(userToLogin){
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword){
                return res.send('puedes ingresar')
            }
        }
        console.log(userToLogin);
        if (userToLogin) {
            console.log("hola");
            req.session.userLogged = userToLogin;
            return res.redirect('/user/profile');
            }
        
        
        return res.render('login',{
            errors: {
                email: {
                    msg: 'las credenciales son invalidas'
                }
            }
        });
    },

    profile: (req, res) => {
        return res.render('perfil', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;