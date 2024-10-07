const express = require("express");
const {
  createVessel,
  updateVessel,
  deleteVessel,
  getVessel,
  getallVessels,
  getVesselsByCompany,
} = require("../controller/vesselCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, isAdmin, createVessel);
router.post("/",  express.json(), createVessel);
router.put("/:id", authMiddleware, isAdmin, updateVessel);
//router.delete("/:id", authMiddleware, isAdmin, deleteVessel);
router.delete("/:id", deleteVessel);
router.get("/by-company/:id", getVesselsByCompany);
router.get("/:id", getVessel);
router.get("/", getallVessels);

module.exports = router;
