const express = require("express");
const {
  createDocument,
  updateDocument,
  updateDocumentStatus,
  deleteDocument,
  getDocument,
  getallDocuments,
  getDocumentsByCompany,
  getDocumentsByVessel,
} = require("../controller/documentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createDocument);
router.put("/status/:id", authMiddleware, updateDocumentStatus);
router.put("/:id", updateDocument);
router.post("/",  express.json(), createDocument);
//router.delete("/:id", authMiddleware, isAdmin, deleteDocument);
router.delete("/:id", deleteDocument);
router.get("/by-company/:id", getDocumentsByCompany);
router.get("/by-vessel/:id", getDocumentsByVessel);
router.get("/:id", getDocument);
router.get("/", getallDocuments);

module.exports = router;
