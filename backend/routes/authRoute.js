const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  getUsersByCompany,
  getUsersByVessel,
  deleteaUser,
  updateUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
//router.post("/register", express.json(), createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/login", express.json(), loginUserCtrl);
router.post("/admin-login", express.json(),  loginAdmin);
router.post("/", express.json(), createUser);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.get("/all-users", getallUser);
router.get("/by-company/:id", getUsersByCompany);
router.get("/by-vessel/:id", getUsersByVessel);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

//router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/:id", getaUser); //FIXME yukardaki hale çevir
router.delete("/:id", deleteaUser);
//router.delete("/order/:id", authMiddleware, isAdmin, deleteOrder);

//router.put("/:id", authMiddleware, isAdmin, updateUser);
router.put("/:id", updateUser); //FIXME yukarıdaki

module.exports = router;
