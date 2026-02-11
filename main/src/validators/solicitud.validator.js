module.exports = (req, res, next) => {
    const { usuarioId, libroId } = req.body;

    if (!usuarioId || !libroId) {
        return res.status(400).json({
            error: 'usuarioId y libroId son obligatorios'
        });
    }

    next();
};