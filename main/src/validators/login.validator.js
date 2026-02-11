module.exports = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email y password son obligatorios'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: 'El password debe tener al menos 6 caracteres'
        });
    }

    next();
};
