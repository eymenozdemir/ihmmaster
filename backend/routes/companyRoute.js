const express = require("express");
const {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getallCompanies,
  getCompaniesByCompany,
} = require("../controller/companyCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createCompany);
router.post("/",  express.json(), createCompany);
router.put("/:id", authMiddleware, isAdmin, updateCompany);
//router.delete("/:id", authMiddleware, isAdmin, deleteCompany);
router.delete("/:id", authMiddleware, deleteCompany);
router.get("/by-company/:id", authMiddleware, getCompaniesByCompany);
router.get("/:id", authMiddleware, getCompany);
router.get("/", authMiddleware, getallCompanies);

module.exports = router;
