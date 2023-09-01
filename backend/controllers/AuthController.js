const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const jwtUtils = require("../utils/jwt.utils");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { models } = require("../models/index");
require("dotenv").config();
const authController = {
  register: async (req, res) => {
    try {
      const { nom, prenom, password, email, role } = req.body;
      await body("email").isEmail().run(req);
      await body("nom").notEmpty().run(req);
      await body("password").run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userFound = await models.User.findOne({ where: { email } });
      if (userFound) {
        return res.status(409).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await models.User.create({
        nom: nom,
        prenom: prenom,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();

      return res.status(201).json({ message: `Welcome ${newUser.prenom}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Cannot add user" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      await body("email").isEmail().run(req);
      await body("password").run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userFound = await models.User.findOne({ where: { email: email } });
      if (!userFound) {
        return res.status(404).json({ error: "user not found" });
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!passwordIsValid) {
        return res.status(403).json({ error: "invalid password" });
      }

      const token = jwtUtils.generateTokenForUser(userFound);

      return res.status(201).json({ Token: token });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "cannot log on user" });
    }
  },
  forgot_password: async (req, res) => {
    //add expired date to token password
    const { email } = req.body;
    try {
      const userFound = await models.User.findOne({ where: { email: email } });
      if (!userFound) {
        return res
          .status(404)
          .json({ error: "User with email does not exist" });
      }
      const code = crypto.randomInt(100000, 999999);
      const hashedCode = await bcrypt.hash(code.toString(), 10);
      const TimeExpired = "5m";

      const token = jwt.sign(
        { email, hashedCode, TimeExpired },
        process.env.ACCESS_TOKEN
      );
      userFound.reset_link = token;
      await userFound.save();
      const link = `http://localhost:5000/reset-password/${userFound.reset_link}`;

      // Utilisez le module Nodemailer correctement configuré pour envoyer un e-mail
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: "565",
        host: "smtp.gmail.com",
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        requireTLS: true,
        auth: {
          user: process.env.USER_GMAIL,
          pass: process.env.USER_PASS,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      var mailOptions = {
        from: process.env.USER_GMAIL,
        to: userFound.email,
        subject: "Password Reset",
        text: link,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    } catch (error) {
      res
        .status(500)

        .json({ error: "An error occurred during password reset" });
    }
  },

  reset_password: async (req, res) => {
    const { reset_link } = req.params;
    try {
      const decodedToken = jwt.decode(reset_link, process.env.ACCESS_TOKEN, {
        complete: true,
      });

      const { email, hashedCode, TimeExpired } = decodedToken;
      const userFound = await models.User.findOne({ where: { email: email } });
      if (!userFound) {
        return res.status(404).json({ error: "User not found" });
      }
      const dbDecodedToken = jwt.decode(
        userFound.reset_link,
        process.env.ACCESS_TOKEN
      );

      const dbHashedCode = dbDecodedToken.hashedCode;

      if (dbHashedCode !== hashedCode && TimeExpired > "5m") {
        return res.status(400).json({ error: "Invalid reset code" });
      }
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await userFound.update({ password: hashedPassword, reset_link: "" });
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

module.exports = authController;
