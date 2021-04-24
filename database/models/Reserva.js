const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    let alias = "Reservas";
    let cols = {
        reservaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        propiedadId: {
            type: DataTypes.INTEGER
        },
        precioDeReserva: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        customerId: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tablename: "reservas",
        timestamps: false
    };

    const Reserva = sequelize.define(alias, cols, config);
    return Reserva;
}