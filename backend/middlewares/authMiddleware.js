const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  console.log("authhhhhh", req?.headers);
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
    //console.log("token", token);
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("decoded", decoded);
        const user = await User.findById(decoded?.id);
        //console.log("user", user);
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
