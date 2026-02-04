const { Libro } = require('../models');
const { Op } = require('sequelize');

exports.buscar = async (req, res) => {
  const { titulo, autor, area } = req.query;

  try {
    const libros = await Libro.findAll({
      where: {
        ...(titulo && { titulo: { [Op.like]: `%${titulo}%` } }),
        ...(autor && { autor: { [Op.like]: `%${autor}%` } }),
        ...(area && { area: { [Op.like]: `%${area}%` } }),
      },
    });

    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: 'Error en búsqueda' });
  }
};