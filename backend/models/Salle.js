module.exports = (sequelize, Sequelize) => {
  const Salle = sequelize.define("salle", {
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    capacite: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    estDisponible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Salle;
};
