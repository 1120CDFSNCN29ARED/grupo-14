const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
    agente: (req, res) => {
        res.render("agente");
    },

    search: (req, res) => {
        // meter un filter
        let ubicacion = req.query.ubicacion;
        let barrio = req.query.barrio;
        let rangoDePrecios = req.query.rangoDePrecios;
        console.log(barrio);
        console.log(ubicacion);
        console.log(rangoDePrecios);
        let productsFiltered = products.filter(product => {
            console.log(product.name);
            switch (rangoDePrecios) {
                case 1:
                    if (10000 > product.precio < 20000) {
                        console.log(product.precio);
                        return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    }
                case 2:
                    if (20001 > product.precio < 30000) {
                        return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    }
                case 3:
                    if (30001 > product.precio < 40000) {
                        return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    }
                case 4:
                    if (40001 > product.precio < 50000) {
                        return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    }
                case 5:
                    if (50001 > product.precio) {
                        return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    }
                    //default:
                    //if (50001 > product.precio) {
                    //  return product.ubicacion.includes(ubicacion) && product.barrio.includes(barrio);
                    //}
            }

        });
        //console.log(productsFiltered);
        res.render("results", { productsFiltered });
    },

};




module.exports = controller;