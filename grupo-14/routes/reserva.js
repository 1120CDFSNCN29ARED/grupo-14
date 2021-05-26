var express = require('express');
const path = require("path");
var router = express.Router();
var multer = require('multer');

const reservasController = require('../controllers/reservasController');



//show de agentes
router.get('/listadoAgentes/',reservasController.show);

//momento de la reserva
router.post('/reservar/:id/',reservasController.reserva);

//aceptar la reserva(desde el agente)
router.post('/aceptar/:id/',reservasController.aceptar);

//rechazar la reserva
router.post('/rechazar/:id/',reservasController.rechazar);

//reservas para usuarios
router.get('/',reservasController.showIndividual);

//detalle de reservas desde el listado de reservas del agente
router.get('/:id/',reservasController.detalleReserva);


module.exports = router;
