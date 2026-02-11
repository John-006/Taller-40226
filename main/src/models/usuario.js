const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user'}
});

module.exports = Usuario;