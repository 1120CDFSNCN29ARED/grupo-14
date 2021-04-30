const fs = require('fs');
const path = require('path');
var multer = require('multer');
const {Agent, Propiedad,Reserva,User} = require('../database/models');
const {Op} = require('sequelize');
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

    producto: (req, res) => { //todos los productos
        //console.log(products);
        Propiedad.findAll().then((propiedades)=>{
            res.render("producto", { products: propiedades  });
        });
    },

    detalle: (req, res) => { //detalle de UN producto
        const id = req.params.id;
        Propiedad.findByPk(req.params.id,{
            include:["Agent"],
        }).then((Propiedad)=>{
            res.render("detalle-producto", {product :Propiedad , toThousand});
        });
    },

    create: (req, res) => {
        // Do the magic

        res.render("nuevoProducto");
    },

    edit: (req, res) => {
        // Do the magic
        const id = req.params.id;
        Propiedad.findByPk(req.params.id,{
            include:["Agent"],
        }).then((Propiedad)=>{
            res.render("editarProducto", {product : Propiedad, toThousand});
        });
    },

    store: (req, res) => {
        Propiedad.findAll()
        Propiedad.create(req.body).then((productoNuevo)=>{
            res.redirect(`/producto/${productoNuevo.propiedadId}`);
        });
    },

    update: (req, res) => {
        // Do the magic

        Propiedad.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then(() => {
            res.redirect(`/producto/${req.params.id}`);
        });
    },

    destroy: (req, res) => {
        // Do the magic
        let productId = req.params.id;
        Propiedad
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    }


};




module.exports = controller;