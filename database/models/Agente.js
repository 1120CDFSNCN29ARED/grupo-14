module.exports = (sequelize, dataTypes) => {
    let alias = "Agente";
    let cols = {
        agenteId: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerName: {
            type: dataTypes.STRING
        },
        nombre: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        constaseña: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tablename: "agentes",
        timestamps: false
    };

    
    const Agente = sequelize.define(alias, cols, config);

    Agente.associate = function (models) {
        Agente.hasMany(models.Propiedad, {
            as: "propiedad",
            foreignKey: "agenteId"
        })
    };

    return Agente;
}