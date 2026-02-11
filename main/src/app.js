const express = require('express');
const cors = require('cors');
const app = express();
const { Usuario, Libro, Solicitud } = require('./models/index');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log('Body recibido:', req.body);
  next();
});

const librosRoutes = require('./routes/libros.routes');
const solicitudesRoutes = require('./routes/solicitudes.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/libros', librosRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Biblioteca funcionando 🚀');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;