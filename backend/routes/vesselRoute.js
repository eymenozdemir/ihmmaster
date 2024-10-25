const express = require("express");
const {
  createVessel,
  updateVessel,
  deleteVessel,
  getVessel,
  getallVessels,
  getVesselsByCompany,
  getVesselsByVessel,
} = require("../controller/vesselCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createVessel);
router.post("/",  express.json(), createVessel);
router.put("/:id", authMiddleware, isAdmin, updateVessel);
//router.delete("/:id", authMiddleware, isAdmin, deleteVessel);
router.delete("/:id", authMiddleware, deleteVessel);
router.get("/by-company/:id", authMiddleware, getVesselsByCompany);
router.get("/by-vessel/:id", authMiddleware, getVesselsByVessel);
router.get("/:id", authMiddleware, getVessel);
router.get("/", authMiddleware, getallVessels);

module.exports = router;
