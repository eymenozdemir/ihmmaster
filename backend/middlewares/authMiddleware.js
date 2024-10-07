const User = require("../models/userModel_old");
//const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  //console.log("authhhhhh", req?.headers?.authorization);
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
    //console.log("token", token);
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.headers.user = user;
        next();
      }
    } catch (error) {
      res.statusCode = 401;
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
    
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  //console.log("isadmine geldi ", req.headers.user.email);
  const email = req.headers.user.email;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "Admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin };
