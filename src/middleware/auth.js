const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({
            message: 'No se proporcionó token de acceso'
        });
    }

    try {
        // Formato del header: "Bearer <token>"
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        // Verificar el token
        // Nota: Asegúrate de tener la misma JWT_SECRET que la API de autenticación
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregar la información del usuario decodificada a la request
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado'
            });
        }
        return res.status(401).json({
            message: 'Token inválido'
        });
    }
};

module.exports = verifyToken;