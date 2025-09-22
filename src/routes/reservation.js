const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const verifyToken = require('../middleware/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

// Get all reservations
router.get('/', reservationController.getAllReservations);

// Get a single reservation by ID
router.get('/:id', reservationController.getReservationById);

// Create a new reservation
router.post('/', reservationController.createReservation);

// Update a reservation
router.put('/:id', reservationController.updateReservation);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;