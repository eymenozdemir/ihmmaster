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
router.put("/:id", authMiddleware, updateDocument);
router.post("/",  express.json(), createDocument);
//router.delete("/:id", authMiddleware, isAdmin, deleteDocument);
router.delete("/:id", authMiddleware, deleteDocument);
router.get("/by-company/:id", authMiddleware, getDocumentsByCompany);
router.get("/by-vessel/:id", authMiddleware, getDocumentsByVessel);
router.get("/:id", authMiddleware, getDocument);
router.get("/", authMiddleware, getallDocuments);

module.exports = router;
