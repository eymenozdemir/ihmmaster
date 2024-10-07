const express = require("express");
const {
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getallDocuments,
  getDocumentsByCompany,
  getDocumentsByVessel,
} = require("../controller/documentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createDocument);
router.post("/",  express.json(), createDocument);
router.put("/:id", authMiddleware, isAdmin, updateDocument);
//router.delete("/:id", authMiddleware, isAdmin, deleteDocument);
router.delete("/:id", deleteDocument);
router.get("/by-company/:id", getDocumentsByCompany);
router.get("/by-vessel/:id", getDocumentsByVessel);
router.get("/:id", getDocument);
router.get("/", getallDocuments);

module.exports = router;
