const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Solicitud = sequelize.define('Solicitud', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Forzamos a Sequelize a usar los nombres EXACTOS de tu phpMyAdmin
    UsuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'UsuarioId' // Esto le dice: "en la DB búscalo exactamente así"
    },
    LibroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'LibroId' // Esto le dice: "en la DB búscalo exactamente así"
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_devolucion: {
        type: DataTypes.DATE,
        allowNull: true // Cámbialo a true para evitar bloqueos mientras pruebas
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado', 'devuelto'),
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'solicituds', // Nombre de la tabla en phpMyAdmin
    timestamps: true
});

module.exports = Solicitud;