const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
//const crypto = require("crypto");
//const jwt = require("jsonwebtoken");
//const sendEmail = require("./emailCtrl");

//var OAuthClient = require('intuit-oauth');


// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  /**
   * TODO:With the help of email find the user exists or not
   */
  const newUser = await User.create(req.body);
  res.json(newUser);

});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      company: findUser?.company,
      vessel: findUser?.vessel,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("buradayiz");
  const findUser = await User.findOne({ email });
  if (findUser?.role !== "Admin" && findUser?.role !== "Company Personal" && findUser?.role !== "Vessel Staff") throw new Error("Not Authorised");
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    console.log("token", refreshToken);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    console.log("updateduser", updateUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      company: findUser?.company,
      vessel: findUser?.vessel,
      role: findUser?.role,
      refreshToken: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  //console.log("burlarda dolanman guxxum");
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  res.json();
});

// Update a user

const updateUser = asyncHandler(async (req, res) => {
  console.log("dsdfssdfdsfffffffffff", req.params, req.body);
  const _id = req.params.id;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        role: req?.body?.role,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        company: req?.body?.company,
        vessel: req?.body?.vessel,
        address: req?.body?.address,
        city: req?.body?.city,
        state: req?.body?.state,
        country: req?.body?.country,
        zip: req?.body?.zip,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users by company

const getUsersByCompany = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  //console.log(req, id);
  try {
    const getUsers = await User.find({ company: id }).populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users by vessel

const getUsersByVessel = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const getUsers = await User.find({ vessel: id }).populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {

  const { id } = req?.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);

    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3001/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getUsersByCompany,
  getUsersByVessel,
  getaUser,
  deleteaUser,
  updateUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
};