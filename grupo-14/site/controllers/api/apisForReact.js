const { validationResult } = require('express-validator');
const db = require('../../database/models');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');
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
        try { //siempre se le tiene que pasar como minimo 1
            const total = await db.Propiedad.count();
            const pages = Math.ceil(total / 10);
            const allPropiedades = await db.Propiedad.findAndCountAll({
                limit : 10,
                offset : 10 * (req.params.page - 1)
            });
            const respuesta = {
                count : allPropiedades.count,
                propiedades : allPropiedades.rows,
                totalPages : pages,
            }
            res.json(respuesta);
        } catch (error) {
            res.json(error);
        }
    },

    productosPorBarrios: async function(req,res){
        const set = new Set();
        const propiedades = await db.Propiedad.findAll();
        for(propiedad of propiedades){
            set.add(propiedad.barrio);
        }
        const array = [...set];
        let respuesta = {
            meta: {
                status: 200,
                total: array.length,
                url: '/api/productosPorBarrios'
            },
            data: array
        }
        res.json(respuesta);
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