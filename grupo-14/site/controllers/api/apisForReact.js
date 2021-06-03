const { validationResult } = require('express-validator');
const db = require('../../database/models');
const bcrypt = require('bcryptjs');
const e = require('express');


const controller = {
    cantDePropiedades : async function(req,res){
        try {
            const respuesta = await db.Propiedad.findAndCountAll();
            res.json(respuesta.count);
        }
        catch(error){
            res.json(0);
        }
    },

    cantDeAgentes : async function(req,res){
        try{
            const respuesta = await db.Agente.findAndCountAll();
            res.json(respuesta.count);
        }catch(error){
            res.json(0);
        }
    },

    cantDeUsers : async function(req,res){
        try {
            const respuesta = await db.User.findAndCountAll();
            res.json(respuesta.count);
        } catch (error) {
            res.json(0);
        }
    },
    ultimoProductoCreado: async function(req,res){
        try {
            const idMax = await db.Propiedad.max('propiedadId');
            const respuesta = await db.Propiedad.findOne({
            where : {
                propiedadId : idMax
            },
        })
        res.json(respuesta);
        } catch (error) {
            const respuesta = await db.Propiedad.findOne();
            res.json(respuesta)
        }
    },
    tablaDeProductos: async function(req,res){
        try {
            const respuesta = await db.Propiedad.findAll({
                limit : 10
            });
            res.json(respuesta);
        } catch (error) {
            res.json(error);
        }
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
}

module.exports = controller;