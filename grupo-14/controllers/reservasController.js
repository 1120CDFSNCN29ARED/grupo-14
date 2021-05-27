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
            customerId : req.session.userId//id del usuario
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

    show: async(req,res)=>{//mostrar vista
        const idsPropiedades = [];
        const idAgente = req.session.agenteId;
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
                [Op.and] : [
                    {propiedadId : {
                        [OP.in] : idsPropiedades
                        }
                    },
                        {status:{
                            [Op.ne] : 'rechazado'}
                        }
                ]
            },
            include:[{
                model:db.Propiedad,
                as : 'propiedad',
            }]
        });


        res.render('reservasAgentes', {reservas : reservas});
    },

    showIndividual: async(req,res)=>{
        console.log(req.session.userLogged);
        if (req.session.userLogged){
            const reserva = await db.Reserva.findAll({
                where : {
                    [Op.and]: [
                        {customerId : req.session.userId},
                        {status:{
                            [Op.ne] : 'rechazado'}
                        }
                    ]
                },
                limit : 1
            }).catch(res.send('revento todo en mil pedazos'));
            const propiedad = await db.Propiedad.findByPk(reserva.propiedadId,{
                include:[{
                    model:db.Agente,
                    as : 'Agente'}
                    ],
            });
            const agente = propiedad.Agente;
            res.render('reservas',{reserva : reserva, propiedad: propiedad, agente:agente});
        }else{
            res.send('Porfavor logearse');
        }
    },
    detalleReserva: async(req,res)=>{
        const idReserva = req.params.id;
        const reserva = db.Reserva.findByPk(idReserva);
            const propiedad = await db.Propiedad.findByPk(reserva.propiedadId,{
                include:[{
                    model:db.Agente,
                    as : 'Agente'}
                    ],
            });
            const agente = propiedad.Agente;
            res.render('reservas',{reserva : reserva, propiedad: propiedad, agente:agente});
    },
}

module.exports = controller;


/*/otro controlador para mostrar el historico de las reservas
    showHistorico : async(req,res) =>{
        const idsPropiedades = [];
        const idAgente = req.session.agenteId;
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
                [Op.and] : [
                    {propiedadId : {
                        [OP.in] : idsPropiedades
                        }
                    },
                        {status:{
                            [Op.ne] : 'rechazado'}
                        }
                ]
            },
        });
        res.render('reservasAgentes', {reservas : reservas});
    },*/ 