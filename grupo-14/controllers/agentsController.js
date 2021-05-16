const { validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
    add: function (req, res) {
        return res.render('agente');
    },
    passEmails: function (req, res) {
        db.Agente.findAll().then(agentes => {
            const array = [];
            for (Agente of agentes) {
                array.push(Agente.email);
            }
            let respuesta = {
                meta: {
                    status: 200,
                    total: agentes.length,
                    url: '/user/api'
                },
                data: array
            }
            res.json(respuesta);
        });
    },
    create: function (req, res) {
        console.log("algo salio mal");
        let agenteInDB = db.Agente.findOne({ where: { email: req.body.email } });
        //agregar que la pass tenga minimo 8 caracteres
        if (agenteInDB.email == req.body.email) {
            console.log("algo salio mal");
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'este email ya esta registardo'
                    }
                },
                oldData: req.body
            });
        }

        db.Agente.create({
            agenteId: req.body.agenteId,
            nombre: req.body.nombre,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file.filename
        });
        res.redirect('/');
    },

    login: function (req, res) {
        return res.render('login');
    },

    loginProcess: (req, res) => {
        let agenteToLogin = db.Agente.findOne({ where: { email: req.body.email } });


        if (agenteToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, agenteToLogin.password);
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