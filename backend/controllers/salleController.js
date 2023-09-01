const { models } = require("../models/index");
const getSalles = async (req, res) => {
  try {
    const salles = await models.salle.findAll();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving room" });
  }
};
const getSalleById = async (req, res) => {
  const { id } = req.params;
  try {
    const salle = await models.salle.findByPk(id);
    if (!salle) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(salle);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving room" });
  }
};
const createSalle = async (req, res) => {
  const { nom, capacite, estDisponible } = req.body;
  try {
    const newSalle = await models.salle.create({
      nom: nom,
      capacite: capacite,
      estDisponible: estDisponible,
    });
    await newSalle.save();
    res.status(201).json(newSalle);
  } catch (error) {
    res.status(500).json({ error: "Error creating room" });
  }
};
const updateSalle = async (req, res) => {
  const { id } = req.params;
  const { nom, capacite, estDisponible } = req.body;
  try {
    const salle = await models.salle.findByPk(id);
    if (!salle) {
      return res.status(404).json({ error: "salle inexiste" });
    }

    await salle.update({
      nom: nom,
      capacite: capacite,
      estDisponible: estDisponible,
    });
    res.json(salle);
  } catch (error) {
    res.status(500).json({ error: "Error updating salle" });
  }
};

const deleteSalle = async (req, res) => {
  const { id } = req.params;
  try {
    const salle = await models.salle.findByPk(id);
    if (!salle) {
      return res.status(404).json({ error: "salle inexiste" });
    }
    await salle.destroy();
    res.json({ message: "Salle supprimer" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting salle" });
  }
};

module.exports = {
  getSalles,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
};
