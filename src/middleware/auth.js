const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
     
}

module.exports = verifyToken;