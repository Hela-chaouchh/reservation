const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { sequelizeConnection } = require("./models/index");
const app = express();
const router = require("./routes/salles");
const authrouter = require("./routes/auth");
const user_router = require("./routes/users");
const res_router = require("./routes/reservation");



sequelizeConnection.sync({ force: false });
app.use(bodyParser.json());

app.set("view engine", "pug");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/salles", router);
app.use("/auth", authrouter);
app.use("/user", user_router);
app.use("/reservation", res_router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
