const fs = require('fs');
const path = require('path');
var multer = require('multer');
const db = require('../database/models');
const {Op} = require('sequelize');
const { reserva } = require('./reservasController');
//const Agente = require('../database/models/Agente');
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//agregar ruta y controlador para crear la reserva.
const controller = {

    producto: (req, res) => { //todos los productos
        //console.log(products);
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
        console.log("entraste")
        const id = req.params.id;
        db.Propiedad.findByPk(id).then((Propiedad)=>{
            console.log(Propiedad.propiedadId);
            res.render("detalle-producto", {product :Propiedad, toThousand});
        })
        .catch(() => {
            console.log("Nuevo error debloqueado");
        })
    },

    create: (req, res) => {
        // Do the magic
        //agregar validaciones de producto
        res.render("nuevoProducto");
    },

    edit: (req, res) => {
        // Do the magic
        //agregar mismas validaciones que create
        const id = req.params.id;
        db.Propiedad.findByPk(req.params.id,{
            include:["Agente"],
        }).then((Propiedad)=>{
            res.render("editarProducto", { product: Propiedad, toThousand});
        });
    },

    store: async(req, res) => {
        const agentChoosen = await getRandomAgent();
        //console.log("prueba del req.file" + req.file.filename);
        const urlImagen = `products/${req.file.filename}`
        db.Propiedad.create({
            reservado : false,
            agenteId : agentChoosen.agenteId,
            image : urlImagen,
            ...req.body
        }).then((productoNuevo)=>{
            res.redirect(`/producto/${productoNuevo.propiedadId}`);
        })
        .catch(() => {
            console.log("error nuevo");
        })
    },

    update: (req, res) => {
        // Do the magic
        let urlImagen;
        try{
            urlImagen = `products/${req.file.filename}`}
        catch (error){
            db.Propiedad.findByPk(req.params.id).then((propiedad)=>{
                urlImagen = propiedad.image;
            })
        }
        db.Propiedad.update({
            image :  urlImagen,
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
        // Do the magic
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