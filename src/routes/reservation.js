const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const verifyToken = require('../middleware/auth');


router.get("/getall", verifyToken, reservationController.getAllReservations);

router.get(
  "/getbyid/:id",
  verifyToken,
  reservationController.getReservationById
);

router.post("/create", verifyToken, reservationController.createReservation);

router.put("/update/:id", verifyToken, reservationController.updateReservation);

router.delete('/delete/:id',verifyToken, reservationController.deleteReservation);

module.exports = router;