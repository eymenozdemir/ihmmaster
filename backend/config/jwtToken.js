const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log("token generatelendi");
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken };
