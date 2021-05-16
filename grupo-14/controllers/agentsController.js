const { validationResult } = require('express-validator');
<<<<<<< HEAD
<<<<<<<< HEAD:grupo-14/controllers/agentsController.js
const Agent = require('../database/models/Agente');
========
const db = require('../database/models');
>>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855:controllers/usersController.js
=======
const Agent = require('../database/models/Agente');
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855
const bcrypt = require('bcryptjs');
const e = require('express');

const controller = {
<<<<<<< HEAD
    add: function (req, res) {
        return res.render('register');
    },
<<<<<<<< HEAD:grupo-14/controllers/agentsController.js
=======
    register: (req, res) => {
        return res.render('register');
    },
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = Agent.findByField('email', req.body.email);
<<<<<<< HEAD
========
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
>>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855:controllers/usersController.js
=======
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855
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
<<<<<<< HEAD
<<<<<<<< HEAD:grupo-14/controllers/agentsController.js
=======
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855

        let agentToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let agentCreated = Agent.create(agentToCreate);
        return res.redirect('/agent/login');
    },

    login: (req, res) => {

<<<<<<< HEAD
========
        
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
>>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855:controllers/usersController.js
=======
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855
        return res.render('login');
    },

    loginProcess: (req, res) => {
<<<<<<< HEAD
<<<<<<<< HEAD:grupo-14/controllers/agentsController.js
=======
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855
        let agentToLogin = Agent.findByField('email', req.body.email);


        if (agentToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, agentToLogin.password);
            if (isOkThePassword) {
<<<<<<< HEAD
========
        let userToLogin = db.User.findByField('email', req.body.email);
        
        
        if(userToLogin){
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword){
>>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855:controllers/usersController.js
=======
>>>>>>> 3c3dde91c465df7d632652a4fb0e306c2128b855
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