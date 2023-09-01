const express = require("express");
const res_router = express.Router();
const reservationController = require("../controllers/reservationController");
const adminAuth = require("../middlewars/adminAuth");
const Auth = require("../middlewars/auth");

res_router.post(
  "/createReservations",
  Auth,
  reservationController.createReservation
);

res_router.get(
  "/reservationsBySalle/:salleId",
  adminAuth,
  reservationController.getReservationsBySalleId
);
res_router.get("/reservations", Auth, reservationController.getAllReservation);

res_router.put("/updateReservation/:id", Auth, reservationController.updateReservation);

res_router.delete(
  "/deleteReservation/:id",
  Auth,
  reservationController.deleteReservation
);
module.exports = res_router;
