const { models } = require("../models/index");

async function createReservation(req, res) {
  try {
    const { salleId, sujet, startTime, endTime, userId } = req.body;
  
if (!salleId || !sujet || !startTime || !endTime || !userId)
{return res.status(401).json({message:"missing Data"})}

    const reservation = await models.reservation.create({
      salleId:salleId,
      startTime:startTime,
      endTime:endTime,
      sujet:sujet,
      UserId:userId,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la réservation" });
  }
}

const getReservationsBySalleId = async (req, res) => {
  const { salleId } = req.params;

  try {
    const reservations = await models.reservation.findAll({
      where: { salleId: salleId },
    });

    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for the provided salleId." });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching reservations." });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const reservations = await models.reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reservations" });
  }
};


const  updateReservation = async (req, res) => {
  try {
    const { salleId, sujet, startTime, endTime, userId } = req.body;
    const { id } = req.params;

    const reservation = await models.reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }
    await reservation.update({
    salleId : salleId,
    startTime : startTime,
    endTime : endTime,
    sujet : sujet,
    userId : userId,
    })


    res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating reservation." });
  }
}



const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await models.reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    await reservation.destroy();

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting reservation." });
  }
};


module.exports = {
  createReservation,
  getReservationsBySalleId,
  getAllReservation,
  updateReservation,
  deleteReservation,
};
