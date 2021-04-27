module.exports = (sequelize, dataTypes) => {
    let alias = "Agent";
    let cols = {
        agenteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerName: {
            type: DataTypes.STRING
        },
        nombre: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        constaseña: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
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