const fs = require('fs');
const path = require('path');
var multer = require('multer');
const {Agent, Propiedad,Reserva,User} = require('../database/models');
const {Op} = require('sequelize');
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, "../public/img/products");
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        const imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({ storage });



const controller = {

    index: (req, res) => {
        //console.log(products);
        Propiedad.findAll().then((propiedades)=>{
            res.render("index", { products: propiedades });
        });
    },

    agente: (req, res) => {
        res.render("agente");
    },

    createAgent: (req, res) => {
        newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = {
            id: products.length + 1,
            nombre: req.body.name + req.body.lastname,
            email: req.body.email,
            contraseña: req.body.password,
            //imagen: req.body.description, 
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect("/");
    },

    createUser: (req, res) => {
        newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = {
            id: products.length + 1,
            nombre: req.body.name + req.body.lastname,
            email: req.body.email,
            contraseña: req.body.password,
            //imagen: req.body.description,
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect("/");
    },

    search: (req, res) => {
        // meter un filter
        let ubicacion = req.query.ubicacion;
        let barrio = req.query.barrio;
        let rangoDePrecios = req.query.rangoDePrecios;
        //console.log(barrio);
        //console.log(ubicacion);
        // console.log(rangoDePrecios);
        const precioMin = Number(rangoDePrecios) * 10000;
        const precioMax = precioMin + 10000;
        let productsFiltered = products.filter(product => {
            if (5 == Number(rangoDePrecios)) {
                return product.direccion.includes(ubicacion) && product.barrio.includes(barrio);
            } else if (precioMin > product.precio && product.precio <= precioMax) {
                //está dentro del rango
                return product.direccion.includes(ubicacion) && product.barrio.includes(barrio);
            }
        });
        //console.log(productsFiltered);
        res.render("results", { productsFiltered });
    },

};




module.exports = controller;