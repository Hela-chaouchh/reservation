const { models } = require("../models/index");
const getAllUsers = async (req, res) => {
  try {
    const Users = await models.User.findAll();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await models.User.findOne({
      attributes: ["id","nom", "prenom", "email", "password", "role"],
      where: { id: userId },
    });

    if (!user) {
      console.log(error);

      return res.status(404).json({ error: "user not found" });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "cannot fetch user" });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nom } = req.body;
    const { prenom } = req.body;
    const {email} = req.body;
    const { password } = req.body;
    const {role} = req.body;

    const userFound = await models.User.findOne({ where: { id: userId } });
    
    if (!userFound) {
      return res.status(404).json({ error: "user not found" });
    }
   const updatedUser = await userFound.update({
      nom: nom,
      prenom: prenom,
      email: email,
      password: password ? await bcrypt.hash(password, 10) : userFound.password,
      role: role,
    });
    return res.status(201).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "cannot update user profile" });
  }
};
module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
