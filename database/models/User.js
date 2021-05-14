module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        userId: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasena: {
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

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Reserva,{
            as: "reservas",
            foreignKey: "customerId"
        })
    };

    return User;
}