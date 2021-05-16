const { validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
    add: function (req, res) {
        return res.render('register');
    },
    passEmails: function(req,res){
        db.User.findAll().then(users => {
            const array = [];
            for(user of users ){
                array.push(user.email);
            }
            let respuesta = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: '/user/api'
                },
                data: array
            }
            res.json(respuesta);
        });
    },
    create: function (req, res) {
        let userInDB = db.User.findOne({ where: { email: req.body.email}});
        //agregar que la pass tenga minimo 8 caracteres
        if (userInDB.email == req.body.email) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'este email ya esta registardo'
                    }
                },
                oldData: req.body
            });
        }
        
        db.User.create({
            userId: req.body.userId,
            nombre: req.body.name,
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file.filename
        });
        res.redirect('/user/login');
    },

    login: function(req,res) {
        return res.render('login');
    },

    loginProcess: (req, res) => {
        let userToLogin = db.User.findByField('email', req.body.email);
        
        
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