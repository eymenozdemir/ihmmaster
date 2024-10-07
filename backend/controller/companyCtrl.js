const Company = require("../models/companyModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCompany = asyncHandler(async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCompany);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    res.json(deletedCompany);
  } catch (error) {
    throw new Error(error);
  }
});
const getCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCompany = await Company.findById(id);
    res.json(getaCompany);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCompanies = asyncHandler(async (req, res) => {
  try {
    const getallCompanies = await Company.find();
    res.json(getallCompanies);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getallCompanies,
};
