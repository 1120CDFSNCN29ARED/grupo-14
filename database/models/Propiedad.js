const Reserva = require("./Reserva");

module.exports = (sequelize, dataTypes) => {
    let alias = "Propiedad";
    let cols = {
        propiedadId: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        agenteId: {
            type: dataTypes.INTEGER,
        },
        precio: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING
        },
        antiguedad: {
            type: dataTypes.INTEGER
        },
        superficieCubierta: {
            type: dataTypes.INTEGER
        },
        superficieDescubierta: {
            type: dataTypes.INTEGER
        },
        banios: {
            type: dataTypes.INTEGER
        },
        cocheras: {
            type: dataTypes.INTEGER
        },
        dormitorios: {
            type: dataTypes.INTEGER
        },
        ambientes: {
            type: dataTypes.INTEGER
        },
        barrio: {
            type: dataTypes.STRING
        },
        destacado: {
            type: dataTypes.BOOLEAN
        },
        reservado: {
            type: dataTypes.BOOLEAN
        },
        precioDeReserva: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "propiedades",
        timestamps: false
    };

const Propiedad = sequelize.define(alias,cols,config);

Propiedad.associate = function (models) {
    Propiedad.hasMany(models.Reserva, {
        as: "reserva",
        foreignKey: "propiedadId"
    })
};

Propiedad.associate = function (models) {
    Propiedad.hasMany(models.Agent, {
        as: "agente",
        foreignKey: "agenteId"
    })
};

return Propiedad;
}
