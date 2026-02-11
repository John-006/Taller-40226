const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    cantidad_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    cantidad_disponible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

module.exports = Libro;