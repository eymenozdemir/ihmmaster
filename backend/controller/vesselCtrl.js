const Vessel = require("../models/vesselModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createVessel = asyncHandler(async (req, res) => {
  try {
    const newVessel = await Vessel.create(req.body);
    res.json(newVessel);
  } catch (error) {
    throw new Error(error);
  }
});

const updateVessel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedVessel = await Vessel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedVessel);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteVessel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedVessel = await Vessel.findByIdAndDelete(id);
    res.json(deletedVessel);
  } catch (error) {
    throw new Error(error);
  }
});

const getVessel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaVessel = await Vessel.findById(id);
    res.json(getaVessel);
  } catch (error) {
    throw new Error(error);
  }
});

const getallVessels = asyncHandler(async (req, res) => {
  try {
    const getallVessels = await Vessel.find().populate("company");
    res.json(getallVessels);
  } catch (error) {
    throw new Error(error);
  }
});

const getVesselsByCompany = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const getallVessels = await Vessel.find({ company: id }).populate("company");
    res.json(getallVessels);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createVessel,
  updateVessel,
  deleteVessel,
  getVessel,
  getallVessels,
  getVesselsByCompany,
};
