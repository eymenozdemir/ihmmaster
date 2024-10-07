const express = require("express");
const {
  createUser,
  loginUserCtrl,
  loginQuickbooks,
  quickbooksCallback,
  getCompanyInfo,
  loginQuickbooksTn,
  quickbooksCallbackTn,
  getCompanyInfoTn,
  isLoggedIn,
  isLoggedInTn,
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
  getWishlist,
  userCart,
  getUserCart,
  getASale,
  deleteSale,
  emptyCart,
  getOrder,
  applyCoupon,
  createOrder,
  getOrders,
  deleteOrder,
  getMyOrders,
  getInvoice,
  getInvoiceTn,
  setInvoice,
  updateOrder,
  updateOrderStatus,
  getAllOrders,
  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { getAllSale } = require("../controller/productCtrl");
const router = express.Router();
//router.post("/register", express.json(), createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/", express.json(), createUser);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", express.json(), loginUserCtrl);
router.post("/quickbooks-login", express.json(), loginQuickbooks);
router.post("/callback", express.json(), quickbooksCallback);
router.get("/callback", express.json(), quickbooksCallback);
router.put("/callback", express.json(), quickbooksCallback);
router.post("/get-company-info", express.json(), getCompanyInfo);
router.put("/get-company-info", express.json(), getCompanyInfo);
router.get("/get-company-info", express.json(), getCompanyInfo);
router.get("/get-invoice", express.json(), getInvoice);
router.post("/quickbooks-login-tn", express.json(), loginQuickbooksTn);
router.post("/callback-tn", express.json(), quickbooksCallbackTn);
router.get("/callback-tn", express.json(), quickbooksCallbackTn);
router.put("/callback-tn", express.json(), quickbooksCallbackTn);
router.get("/is-logged-in", express.json(), isLoggedIn);
router.get("/is-logged-in-tn", express.json(), isLoggedInTn);
router.post("/get-company-info-tn", express.json(), getCompanyInfoTn);
router.put("/get-company-info-tn", express.json(), getCompanyInfoTn);
router.get("/get-company-info-tn", express.json(), getCompanyInfoTn);
router.get("/get-invoice-tn", express.json(), getInvoiceTn);
router.post("/set-invoice", express.json(), setInvoice);
router.post("/admin-login", express.json(),  loginAdmin);
router.post("/cart", express.json(), authMiddleware, userCart);
router.post("/cart/applycoupon", express.json(), authMiddleware, applyCoupon);
router.post("/create-order", express.json(), authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/by-company/:id", getUsersByCompany);
router.get("/by-vessel/:id", getUsersByVessel);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/get-all-orders", getAllOrders);
router.get("/get-all-sales", getAllSale);
//router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", express.json(), authMiddleware, isAdmin, getAllOrders);
router.get("/sales/:id", getASale);
router.get("/orders/:id", getOrder);
router.put("/order/:id", updateOrder);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

//router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/:id", getaUser); //FIXME yukardaki hale çevir
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/order/:id", deleteOrder);
router.delete("/sales/:id", deleteSale);
router.delete("/:id", deleteaUser);
//router.delete("/order/:id", authMiddleware, isAdmin, deleteOrder);

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
//router.put("/:id", authMiddleware, isAdmin, updateUser);
router.put("/:id", updateUser); //FIXME yukarıdaki

module.exports = router;
