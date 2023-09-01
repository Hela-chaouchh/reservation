const { body, validationResult } = require("express-validator");
//register

function dataCheck_register(req, res, next) {
  const validationRules = [
    body("email")
      .notEmpty()
      .withMessage("L'email est requis.")
      .isEmail()
      .withMessage("L'email doit être valide."),
    body("password")
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .isLength({ min: 8 })
      .matches(/\d/)
      .withMessage("Le mot de passe doit avoir au moins 8 caractères."),
    body("nom")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Le nom doit avoir au moins 8 caractères."),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
}
//login
function dataCheck_login(req, res, next) {
  const validationRules = [
    body("email")
      .notEmpty()
      .withMessage("L'email est requis.")
      .isEmail()
      .withMessage("L'email doit être valide."),
    body("password")
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .isLength({ min: 8 })
      .matches(/\d/)
      .withMessage("Le mot de passe doit avoir au moins 8 caractères."),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
}
//forgot_password
function dataCheck_forgot_password(req, res, next) {
  const validationRules = [
    body("email")
      .notEmpty()
      .withMessage("L'email est requis.")
      .isEmail()
      .withMessage("L'email doit être valide."),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
}
//reset_password
function dataCheck_reset_password(req, res, next) {
  const validationRules = [
    body("password")
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .isLength({ min: 8 })
      .matches(/\d/)
      .withMessage("Le mot de passe doit avoir au moins 8 caractères."),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
}

module.exports = {
  dataCheck_login,
  dataCheck_register,
  dataCheck_forgot_password,
  dataCheck_reset_password,
};
