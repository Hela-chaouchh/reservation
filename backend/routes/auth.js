const express = require("express");
const dataCheck = require("../middlewars/datacheck");
const authrouter = express.Router();
const authcontroller = require("../controllers/AuthController");
const verifyJWT = require("../middlewars/verifyJWT");

authrouter.post(
  "/register",
  dataCheck.dataCheck_register,
  authcontroller.register
);

authrouter.post("/login", 
dataCheck.dataCheck_login, 
authcontroller.login);

authrouter.post(
  "/forgot_password",
  dataCheck.dataCheck_forgot_password,
  authcontroller.forgot_password
);
authrouter.post(
  "/reset_password/:reset_link",
  dataCheck.dataCheck_reset_password,
  authcontroller.reset_password
);

module.exports = authrouter;
