const express = require("express");
const { uploadImages, deleteImages, uploadFiles, downloadFiles } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const multer = require("multer");
const router = express.Router();
const upload = multer();


router.post(
  "/file",
  //authMiddleware,
  upload.any(),
  //productImgResize,
  uploadFiles
);

router.post(
  "/download",
  //authMiddleware,
  //productImgResize,
  downloadFiles
);


module.exports = router;
