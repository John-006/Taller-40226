const jwt = require('jsonwebtoken');
const User = require('../models/usuario');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no existe' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    console.log("¿Existe el secreto?:", process.env.JWT_SECRET);
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error("ERROR DETECTADO:", error); // Esto imprimirá el error real en tu consola de VS Code
    res.status(500).json({ message: 'Error en login', detail: error.message });
  }
};