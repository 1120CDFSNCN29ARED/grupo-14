const { validationResult } = require('express-validator');
const Agent = require('../database/models/Agente');
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = Agent.findByField('email', req.body.email);
        //agregar que la pass tenga minimo 8 caracteres
        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'este email ya esta registardo'
                    }
                },
                oldData: req.body
            });
        }

        let agentToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let agentCreated = Agent.create(agentToCreate);
        return res.redirect('/agent/login');
    },

    login: (req, res) => {

        return res.render('login');
    },

    loginProcess: (req, res) => {
        let agentToLogin = Agent.findByField('email', req.body.email);


        if (agentToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, agentToLogin.password);
            if (isOkThePassword) {
                return res.send('puedes ingresar')
            }
        }
        console.log(agentToLogin);
        if (agentToLogin) {
            console.log("hola");
            req.session.agentLogged = agentToLogin;
            return res.redirect('/agent/profile');
        }


        return res.render('login', {
            errors: {
                email: {
                    msg: 'las credenciales son invalidas'
                }
            }
        });
    },

    profile: (req, res) => {
        return res.render('perfil', {
            agent: req.session.agentLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;