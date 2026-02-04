const { Solicitud, Libro } = require('../models');

exports.crear = async (req, res) => {
  const { libroId } = req.body;
  const userId = req.user.id;

  try {
    const libro = await Libro.findByPk(libroId);

    if (!libro || libro.disponibles <= 0) {
      return res.status(400).json({ message: 'Libro no disponible' });
    }

    await Solicitud.create({
      userId,
      libroId,
      fecha: new Date(),
    });

    libro.disponibles -= 1;
    await libro.save();

    res.status(201).json({ message: 'Solicitud creada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear solicitud' });
  }
};