var jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Exported functions
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        role: userData.role,
      },
      ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );
  },
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function (authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, ACCESS_TOKEN);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {}
    }
    return userId;
  },
};
