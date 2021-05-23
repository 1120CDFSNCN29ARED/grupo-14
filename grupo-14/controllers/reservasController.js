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
        const id = req.params.id;
        const reserva = await db.Reserva.findByPk(id);
        if (reserva == null){
            res.send('no existe la reserva');
        }else{
            await reserva.update({
                status : 'aprobado',
            });
        }
        res.redirect(`/producto/reservar/${id}/`);
    },

//otro controlador para dar de baja la reserva
    rechazar : async(req,res) =>{
        const id = req.params.id;
        const reserva = await db.Reserva.findByPk(id,{
            include : [{
                model : db.Propiedad,
                as : 'Propiedad',
            }]
        });
        await reserva.update({
            status : 'rechazado',
        });
        await reserva.Propiedad.update({
            reservado : false
        });
        res.redirect(`/producto/reservar/${id}/`);
    },



//otro controlador para mostrar el historico de las reservas
    showHistorico : async(req,res) =>{
        const idsPropiedades = [];
        const idAgente = req.params.id;
        try {
            const propiedades = await db.Propiedad.findAll({
                Where : {
                    agenteId : idAgente,
                },
            });
        }catch(e){
            res.send('Error 404');
        }
        
        for(propiedad in propiedades){
            idsPropiedades.add(propiedades.propiedadId);
        }

        const reservas = await db.Reserva.findAll({
            Where :{
                propiedadId : {
                    [OP.in] : idsPropiedades
                }
            },
        });
        //res.render(vista de reservas, reservas : reservas )
    },

    show: async(req,res)=>{//mostrar vista
        const idsPropiedades = [];
        const idAgente = req.params.id;
        const propiedades = await db.Propiedad.findAll({
            Where : {
                agenteId : idAgente,
                reservado : true,
            },
        });
        for(propiedad in propiedades){
            idsPropiedades.add(propiedades.propiedadId);
        }

        const reservas = await db.Reserva.findAll({
            Where :{
                propiedadId : {
                    [OP.in] : idsPropiedades
                }
            },
        });
        //res.render(vista de reservas, reservas : reservas);
    }
}

module.exports = controller;