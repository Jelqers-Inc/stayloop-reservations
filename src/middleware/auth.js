const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader) {
        return res.status(403).json({ message: 'Se necesita token' });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        // Verificar el token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
     
}

module.exports = verifyToken;