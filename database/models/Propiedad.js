module.exports = (sequelize, dataTypes) => {
    let alias = "Propiedades";
    let cols = {
        propiedadId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        agenteId: {
            type: DataTypes.INTEGER,
        },
        precio: {
            type: DataTypes.INTEGER
        },
        descripcion: {
            type: DataTypes.STRING
        },
        antiguedad: {
            type: DataTypes.INTEGER
        },
        superficieCubierta: {
            type: DataTypes.INTEGER
        },
        superficieDescubierta: {
            type: DataTypes.INTEGER
        },
        banios: {
            type: DataTypes.INTEGER
        },
        cocheras: {
            type: DataTypes.INTEGER
        },
        dormitorios: {
            type: DataTypes.INTEGER
        },
        ambientes: {
            type: DataTypes.INTEGER
        },
        barrio: {
            type: DataTypes.STRING
        },
        destacado: {
            type: DataTypes.BOOLEAN
        },
        reservado: {
            type: DataTypes.BOOLEAN
        },
        precioDeReserva: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tablename: "propiedades",
        timestamps: false
    };

const Propiedad = sequelize.define(alias,cols,config);
return Propiedad;
}
