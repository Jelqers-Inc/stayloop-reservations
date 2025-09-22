const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    idHotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idTipoHabitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaRealizado: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'reservas',
    timestamps: false
});

module.exports = Reservation;