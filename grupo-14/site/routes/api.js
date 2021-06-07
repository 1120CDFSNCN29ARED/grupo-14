var express = require('express');
const path = require("path");
var router = express.Router();
var multer = require('multer');
const apiController = require('../controllers/api/apisForReact');

//todas las rutas empiezan con /api/


//todos los datos son en formato json, incluso los numericos

//devuelve dato numerico de cant de propiedades
router.get('/propiedades',apiController.cantDePropiedades);

//devuelve dato numerico de cant de agentes
router.get('/agentes',apiController.cantDeAgentes);

//devuelve dato numero de cantidad de usuarios
router.get('/users',apiController.cantDeUsers);

//devuelve todos los datos numero de el ultimo producto creado
router.get('/ultimoProducto',apiController.ultimoProductoCreado);

//devuelve 10 productos, si nos alcanza tiempo podemos intentar implementar el paginado
router.get('/tablaDeProductos/:page',apiController.tablaDeProductos);

//productos segun 6 barrios
router.get('/productosPorBarrio', apiController.productosPorBarrios);

//devuelvo los emails de los usuarios para valdiar en frontend
router.get('/',apiController.passEmails);

module.exports = router;