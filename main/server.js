require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        // Verificar conexión a la base de datos
        await sequelize.authenticate();
        console.log('Conectado a la base de datos');

        // Sincronizar modelos con la BD
        await sequelize.sync();
        console.log('Modelos sincronizados');

        // Levantar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
        } catch (error) {
            console.error('Error al iniciar el servidor:', error);
    }
})();
