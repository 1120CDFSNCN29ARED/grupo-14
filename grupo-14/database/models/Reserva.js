module.exports = (sequelize, dataTypes) => {
    let alias = "Reserva";
    let cols = {
        reservaId: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        propiedadId: {
            type: dataTypes.INTEGER
        },
        precioDeReserva: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.STRING
        },
        customerId: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tablename: "reservas",
        timestamps: false
    };

    const Reserva = sequelize.define(alias, cols, config);
    
    Reserva.associate = function (models) {
        Reserva.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    };

    Reserva.associate = function (models) {
        Reserva.belongsTo(models.Propiedad, {
            as: "propiedad",
            foreignKey: "propiedadId"
        })
    };

    return Reserva;
}