const fs = require('fs');
const path = require('path');
const router = require('../routes');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

    index: (req, res) => {
        //console.log(products);
        res.render("producto", { products: products });
    },

    detalle: (req, res) => {
        const id = req.params.id;
        const product = products.find((prod) => {
            return prod.id == id;
        })

        res.render("detalle-producto", { product, toThousand });
    },

    create: (req, res) => {
        // Do the magic
        res.render("nuevoProducto");
    },

    edit: (req, res) => {
        // Do the magic
        const id = req.params.id;
        const product = products.find((prod) => {
            return prod.id == id;
        })
        res.render("editarProducto", { product })
    },

    store: (req, res) => {
        // Do the magic
        //.res.send(req.body);
        newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = {
            id: products.length + 1,
            name: req.body.name,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            description: req.body.description,
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.render("detalle-producto", { product: newProduct, toThousand })
    },


    update: (req, res) => {
        // Do the magic
        const id = req.params.id;
        let productACambiar = products.find((prod) => {
            return prod.id == id;
        })
        productACambiar = {
            name: req.body.name,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            description: req.body.description,
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.render("detalle-producto", { product: productACambiar, toThousand });
    },

    destroy: (req, res) => {
        // Do the magic
        const productsFilter = products.filter((prod) => {
            return prod.id != req.params.id;
        });
        console.log("hola");
        /*const productIndex = products.findIndex((prod)=>{
        	return.prod.id == req.params.id;
        });
        products.splice(productsIndex, 1); */
        fs.writeFileSync(productsFilePath, JSON.stringify(productsFilter));
        res.render("index");

    }


};




module.exports = controller;