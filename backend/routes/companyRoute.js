const express = require("express");
const {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getallCompanies,
} = require("../controller/companyCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createCompany);
router.post("/",  express.json(), createCompany);
router.put("/:id", authMiddleware, isAdmin, updateCompany);
//router.delete("/:id", authMiddleware, isAdmin, deleteCompany);
router.delete("/:id", deleteCompany);
router.get("/:id", getCompany);
router.get("/", getallCompanies);

module.exports = router;
