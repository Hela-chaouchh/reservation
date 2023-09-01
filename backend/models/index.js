const fs = require("fs");
const Sequelize = require("sequelize");
const config = require("../config/config");
const models = {};
require("dotenv").config();

const sequelizeConfig = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
};

const sequelizeConnection = new Sequelize(sequelizeConfig);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") != 0 && file !== "index.js")
  .forEach((file) => {
    let model = require("./" + file)(sequelizeConnection, Sequelize);
    models[model.name] = model;
  });
console.log(models);

models.salle.hasMany(models.reservation);
models.reservation.belongsTo(models.salle);

models.User.hasMany(models.reservation);
models.reservation.belongsTo(models.User);

models.sequelize = sequelizeConnection;
models.Sequelize = Sequelize;

module.exports = {
  models,
  sequelizeConnection,
};
