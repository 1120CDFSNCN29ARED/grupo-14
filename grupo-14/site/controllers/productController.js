const fs = require('fs');
const path = require('path');
var multer = require('multer');
const db = require('../database/models');
const {Op} = require('sequelize');
const { reserva } = require('./reservasController');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

    producto: (req, res) => { //todos los productos;
        db.Propiedad.findAll({
            where:{
                reservado : false,
            },
        }
        ).then((propiedades)=>{
            res.render("producto", {
                products: propiedades  });
        });
    },

    detalle: (req, res) => { //detalle de UN producto
        const id = req.params.id;
        db.Propiedad.findByPk(id).then((Propiedad)=>{
            res.render("detalle-producto", {product :Propiedad, toThousand});
        })
        .catch(() => {
        })
    },

    create: (req, res) => {
        res.render("nuevoProducto");
    },

    edit: (req, res) => {
        const id = req.params.id;
        db.Propiedad.findByPk(req.params.id,{
            include:["Agente"],
        }).then((Propiedad)=>{
            res.render("editarProducto", { product: Propiedad, toThousand});
        });
    },

    store: async(req, res) => {
        const agentChoosen = await getRandomAgent();
        const urlImagen = `products/${req.file.filename}`;
        const valor = req.body.destacado==='1'? true:false;
        db.Propiedad.create({
            reservado : false,
            agenteId : agentChoosen.agenteId,
            image : urlImagen,
            destacado: valor,
            ...req.body
        }).then((productoNuevo)=>{
            res.redirect(`/producto/${productoNuevo.propiedadId}`);
        })
        .catch(() => {
        })
    },

    update: (req, res) => {
        let urlImagen;
        try{
            urlImagen = `products/${req.file.filename}`}
        catch (error){
            db.Propiedad.findByPk(req.params.id).then((propiedad)=>{
                urlImagen = propiedad.image;
            })
        }
        const valor = req.body.destacado === '1' ? true : false;
        db.Propiedad.update({
            image :  urlImagen,
            destacado: valor,
            ...req.body
        }, {
            where: {
                propiedadId: req.params.id,
            },
        }).then(() => {
            res.redirect(`/producto/${req.params.id}`);
        });
    },

    destroy: (req, res) => {
        let productId = req.params.id;
        db.Propiedad
        .destroy({where: {propiedadId: productId}, force: true}) 
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    }
};



function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
async function getRandomAgent(){
    const size = await db.Agente.count();
    const agentes = await db.Agente.findAll();
    const randomNumber = between(0,size-1);
    return agentes[randomNumber];
}

module.exports = controller;