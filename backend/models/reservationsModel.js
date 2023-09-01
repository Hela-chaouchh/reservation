module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservation", {
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sujet: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Reservation;
};
