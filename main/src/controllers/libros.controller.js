const Libro = require('../models/libro');
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

exports.obtenerTodos = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros'});
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado'});
    }
  
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar libro' });
  }
}

exports.crear = async (req, res) => {
  const { titulo, autor, area, cantidad_total } = req.body;

  if (!titulo || !autor || !area) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    const nuevoLibro = await Libro.create({
      titulo,
      autor,
      area,
      cantidad_total,
      cantidad_disponible: cantidad_total
    });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear libro' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    await libro.update(req.body);
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar libro' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar libro' });
  }
};

