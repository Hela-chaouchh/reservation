const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
  const token = req.header("Authorization"); // Assuming the JWT is sent in the 'Authorization' header

  if (!token) {
    return res.status(401).json({ error: "JWT must be provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace 'your_jwt_secret' with your actual JWT secret key
    req.user = decoded; // Store the decoded user information in the request object for later use
    next(); // Proceed to the next middleware or the route handler
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Invalid JWT" });
  }
}
module.exports = verifyJWT;
