const express = require("express");
const router = express.Router();
const salleController = require("../controllers/salleController");
const userAuth = require("../middlewars/auth");
const adminAuth = require("../middlewars/adminAuth");

router.get("/salles", userAuth, salleController.getSalles);
router.get("/salleById/:id", userAuth, salleController.getSalleById);
router.post("/createSalle", adminAuth, salleController.createSalle);
router.put("/updateSalle/:id", adminAuth, salleController.updateSalle);
router.delete("/deleteSalle/:id", adminAuth, salleController.deleteSalle);

module.exports = router;
