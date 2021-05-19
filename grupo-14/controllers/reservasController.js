const fs = require('fs');
const path = require('path');
var multer = require('multer');
const db = require('../database/models');
const {Op} = require('sequelize');

const controller = {
    reserva : async (req,res) => {
        const id = req.params.id;
        const propiedad = await db.Propiedad.findByPk(req.params.id,{
            include:[{
                model:db.Agente,
                as : 'Agente'}
                ],
        });
        if(!propiedad.reservado){
            const reserva = await db.Reserva.create({
            propiedadId : propiedad.propiedadId,
            precioDeReserva : propiedad.precio,
            status : "en aprobacion de reserva",
            customerId : 1//id del usuario
            })

            propiedad.update({
                precioDeReserva : propiedad.precio,
                reservado : true
            });

           const agente = propiedad.Agente;
           console.log(propiedad);
            
            
            res.render('reservas', {reserva : reserva, propiedad: propiedad, agente:agente});
        }else{
            res.send('esta reservado');
       }
    },

    aceptar : async(req,res) =>{
        //cambiarle el estado a la reserva BROTHER
    },

    show: async(req,res)=>{//mostrar vista

    }
}

module.exports = controller;