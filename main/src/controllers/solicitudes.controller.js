const Solicitud = require('../models/solicitud');
const Libro = require('../models/libro');

exports.crear = async (req, res) => {
  // 1. Extraemos los datos del body (Asegúrate de que los nombres coincidan con Postman)
  const { libroId, usuarioId } = req.body; 

  try {
    const libro = await Libro.findByPk(libroId);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    // OJO: En tu log veo que tu tabla usa "cantidad_disponible" en lugar de "disponibles"
    if (libro.cantidad_disponible <= 0) {
      return res.status(400).json({ message: 'Libro no disponible' });
    }

    // 2. Aquí es donde fallaba: usaremos "usuarioId" que sacamos del body arriba
    await Solicitud.create({
      UsuarioId: usuarioId, // Nombre de la columna en tu DB (U mayúscula)
      LibroId: libroId,   // Nombre de la columna en tu DB (L mayúscula)
      fecha_solicitud: new Date(),
      fecha_devolucion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
      estado: 'pendiente'
    });

    // 3. Actualizamos el stock
    libro.cantidad_disponible -= 1; 
    await libro.save();

    res.status(201).json({ 
      message: 'Solicitud creada con éxito',
      libro: libro.titulo
    });

  } catch (error) {
    console.error("ERROR DETECTADO:", error);
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    // Buscamos todas las solicitudes
    const solicitudes = await Solicitud.findAll({
      // Esto trae la información de las tablas relacionadas
      include: [
        { model: Libro, attributes: ['titulo', 'autor'] }
      ]
    });

    res.status(200).json(solicitudes);
  } catch (error) {
    console.error("ERROR AL LISTAR:", error);
    res.status(500).json({ 
      message: 'Error al obtener solicitudes', 
      error: error.message 
    });
  }
};

exports.devolver = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID de la solicitud desde la URL

    try {
        // 1. Buscamos la solicitud incluyendo el Libro para poder sumarle stock
        const solicitud = await Solicitud.findByPk(id, { include: [Libro] });

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        if (solicitud.estado === 'devuelto') {
            return res.status(400).json({ message: 'Este libro ya fue devuelto previamente' });
        }

        // 2. Actualizamos la solicitud: estado y fecha
        solicitud.estado = 'devuelto';
        solicitud.fecha_devolucion = new Date();
        await solicitud.save();

        // 3. Devolvemos el stock al libro (cantidad_disponible + 1)
        const libro = solicitud.Libro;
        if (libro) {
            libro.cantidad_disponible += 1;
            await libro.save();
        }

        res.status(200).json({ 
            message: 'Libro devuelto con éxito y stock actualizado',
            detalles: {
                libro: libro.titulo,
                nuevoStock: libro.cantidad_disponible
            }
        });

    } catch (error) {
        console.error("Error en devolución:", error);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};