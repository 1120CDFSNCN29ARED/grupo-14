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
        let emailcreado = req.body.email;
        let contaseñacreada = req.body.password;
        const resultValidation = validationResult(req);
        console.log(resultValidation.isEmpty());
        if (!resultValidation.isEmpty()) {
            console.log("algo salio mal");
            return res.render('agente', {
                errors: resultValidation.mapped(),
                oldData: req.body

            });
        };

        console.log(contaseñacreada.length);

        if (contaseñacreada.length < 8) {
            console.log("deberia caerse");
            return res.render('agente', {
                errors: {
                    password: "contraseña corta"
                },
                oldData: req.body
            });
        };

        db.Agente.findOne({ where: { email: emailcreado } }).then((agenteInDB)=>{
        //agregar que la pass tenga minimo 8 caracteres
        console.log(agenteInDB);
        if (agenteInDB) {
            console.log("deberia volver");
            return res.render('agente', {
                errors: {
                    email: "email ya existe"
                },
                oldData: req.body
            });
            }
        else {
            db.Agente.create({
                agenteId: req.body.agenteId,
                nombre: req.body.name,
                email: req.body.email,
                contrasena: bcrypt.hashSync(req.body.password, 10),
                imagen: req.file.filename
            });
            console.log(req.body.password);
            return res.redirect('/');
        }
        })
    },

    login: function (req, res) {
        return res.render('loginAgente');
    },

    loginProcess: (req, res) => {
        let emailIngresado = req.body.email;
        db.Agente.findOne({ where: { email: emailIngresado } }).then((agenteToLogin) => {
            console.log(agenteToLogin)
        
            let isOkThePassword = bcrypt.compareSync(req.body.password, agenteToLogin.contrasena);
            console.log(isOkThePassword);
            if (isOkThePassword){
                console.log("hola");
                req.session.userLogged = agenteToLogin;
                return res.redirect('/user/profile');
            }
            else{
                console.log("les dire a los niños que no hay pagina");
                return res.render('loginAgente',{
                errors: {
                    email: {
                        msg: 'las credenciales son invalidas'
                    }
                }
            });};
        })
        .catch(() => {
            
            return res.render('loginAgente', {
            errors: {
                email: {
                    msg: 'las credenciales son invalidas'
                }
            }})})
    },

    profile: (req, res) => {
        console.log(req.session.userLogged.imagen);
        return res.render('perfil', {
            agent: req.session.userLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;