module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
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

    const User = sequelize.define(alias, cols, config);
    return User;
}