var express = require('express');
const path = require("path");
var router = express.Router();
var multer = require('multer');

const productsController = require('../controllers/productController');


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

// search
router.get('/', productsController.producto);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create);


router.post('/', upload.single("imagen"), productsController.store);

//detalle del producto
router.get('/:id/', productsController.detalle);

//editar
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', upload.single("imagen"), productsController.update);

console.log('hola');
router.delete('/:id', productsController.destroy);


module.exports = router;