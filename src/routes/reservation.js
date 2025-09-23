const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get('/getall', reservationController.getAllReservations);

router.get('/getbyid/:id', reservationController.getReservationById);

router.post('/create', reservationController.createReservation);

router.put('/update/:id', reservationController.updateReservation);

router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;