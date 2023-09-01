module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.ENUM("admin", "employee"),
      allowNull: false,
      defaultValue: "employee",
    },
    reset_link: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });
  return User;
};
