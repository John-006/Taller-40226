const Usuario = require('./usuario');
const Libro = require('./libro');
const Solicitud = require('./solicitud');

// Relación con Usuario
Usuario.hasMany(Solicitud, { foreignKey: 'UsuarioId' });
Solicitud.belongsTo(Usuario, { foreignKey: 'UsuarioId' });

// Relación con Libro
Libro.hasMany(Solicitud, { foreignKey: 'LibroId' });
Solicitud.belongsTo(Libro, { foreignKey: 'LibroId' });