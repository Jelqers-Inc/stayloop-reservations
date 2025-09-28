const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        },
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida existosamente.');
    } catch (error) {
        console.error('Error al conectarse a la base de datos.', error);
    }
});

module.exports = sequelize;