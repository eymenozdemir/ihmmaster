const express = require("express");
const {
  createFileCategory,
  updateFileCategory,
  deleteFileCategory,
  getFileCategory,
  getallFileCategories,
} = require("../controller/fileCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createFileCategory);
router.post("/",  express.json(), createFileCategory);
router.put("/:id", authMiddleware, isAdmin, updateFileCategory);
//router.delete("/:id", authMiddleware, isAdmin, deleteFileCategory);
router.delete("/:id", authMiddleware, deleteFileCategory);
router.get("/:id", authMiddleware, getFileCategory);
router.get("/", authMiddleware, getallFileCategories);

module.exports = router;
