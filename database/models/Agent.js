module.exports = (sequelize, dataTypes) => {
    let alias = "Agent";
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
        tablename: "users",
        timestamps: false
    };

    
    const Agent = sequelize.define(alias, cols, config);

    Agent.associate = function (models) {
        Agent.hasMany(models.Propiedad, {
            as: "propiedad",
            foreignKey: "agenteId"
        })
    };

    return Agent;
}