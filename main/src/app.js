const express = require('express');

const app = express();

// Middlewares básicos
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Biblioteca funcionando');
});

module.exports = app;
