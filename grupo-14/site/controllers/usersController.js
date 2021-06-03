const { validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
    add: function (req, res) {
        return res.render('register');
    },
   
    create: function (req, res) {
        let emailcreado = req.body.email;
        let contaseñacreada = req.body.password;
        const resultValidation = validationResult(req);
        console.log(resultValidation.isEmpty());
        if (!resultValidation.isEmpty()) {
            return res.render('agente', {
                errors: resultValidation.mapped(),
                oldData: req.body

            });
        };
        
        if (contaseñacreada.length < 8) {
            return res.render('agente', {
                errors: {
                    password: "contraseña corta"
                },
                oldData: req.body
            });
        };

        db.User.findOne({ where: { email: emailcreado } }).then((userInDB)=>{
        //agregar que la pass tenga minimo 8 caracterer
        if (userInDB) {
            return res.render('agente', {
                errors: {
                    email: "email ya existe"
                },
                oldData: req.body
            });
            }
        
        else {
        db.User.create({
            userId: req.body.userId,
            nombre: req.body.name,
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file.filename
        });
        return res.redirect('/');
        }
        })
    },

    login: function(req,res) {
        return res.render('login');
    },

    loginProcess: (req, res) => {
        let emailIngresado = req.body.email;
        db.User.findOne({ where: { email: emailIngresado } }).then((userToLogin) => {
            console.log(userToLogin)
        
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.contrasena);
            console.log(isOkThePassword);
            if (isOkThePassword){
                console.log("hola");
                req.session.userLogged = userToLogin;
                return res.redirect('/user/profile');
            }
            else{
                console.log("les dire a los niños que no hay pagina");
                return res.render('login',{
                errors: {
                    email: {
                        msg: 'las credenciales son invalidas'
                    }
                }
            });};
        })
        .catch(() => {
            
            return res.render('login', {
            errors: {
                email: {
                    msg: 'las credenciales son invalidas'
                }
            }})})
    },

    profile: (req, res) => {
        console.log(req.session.userLogged);
        return res.render('perfil', {
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;