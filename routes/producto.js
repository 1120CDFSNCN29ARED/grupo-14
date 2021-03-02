var express = require('express');
var router = express.Router();
var multer = require('multer');

const productsController = require('../controllers/productController');


// search
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create);


router.post('/', productsController.store);

//detalle del producto
router.get('/:id/', productsController.detalle);

//editar
router.get('/:id/edit', productsController.edit);
router.put('/edit', productsController.update);

console.log('hola');
router.delete('/:id', productsController.destroy);

module.exports = router;