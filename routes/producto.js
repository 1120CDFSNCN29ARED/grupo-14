var express = require('express');
const path = require("path");
var router = express.Router();
var multer = require('multer');

const productsController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, "../public/img/products");
        if (file.mimetype != "image/jpeg") {
            return cb(new Error("Solo se aceptan imagenes en jpg"));
        }
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        const imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({ storage });

// search
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create);


router.post('/', upload.single("archivo"), productsController.store);

//detalle del producto
router.get('/:id/', productsController.detalle);

//editar
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', upload.single("archivo"), productsController.update);

console.log('hola');
router.delete('/:id', productsController.destroy);

module.exports = router;