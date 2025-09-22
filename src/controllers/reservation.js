const Reservation = require('../models/reservation');

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservaciones', error: error.message });
    }
};

// Get all reservations by user ID
exports.getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ where: {
        idUsuario: req.params.idUsuario
    }});
    res.json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las reservaciones",
        error: error.message,
      });
  }
};

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reservación', error: error.message });
    }
};

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const newReservation = await Reservation.create({
            idUsuario: req.body.idUsuario,
            idHotel: req.body.idHotel,
            idTipoHabitacion: req.body.idTipoHabitacion,
            fechaRealizado: new Date(),
            total: req.body.total,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin
        });
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reservación', error: error.message });
    }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }
        
        await reservation.update(req.body);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reservación', error: error.message });
    }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }
        
        await reservation.destroy();
        res.json({ message: 'Reservación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reservación', error: error.message });
    }
};