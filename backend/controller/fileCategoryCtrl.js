const FileCategory = require("../models/fileCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createFileCategory = asyncHandler(async (req, res) => {
  console.log("girdik burdayiz");
  try {
    const newFileCategory = await FileCategory.create(req.body);
    res.json(newFileCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateFileCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedFileCategory = await FileCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedFileCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteFileCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedFileCategory = await FileCategory.findByIdAndDelete(id);
    res.json(deletedFileCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getFileCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaFileCategory = await FileCategory.findById(id);
    res.json(getaFileCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallFileCategories = asyncHandler(async (req, res) => {
  console.log("ctrlye geldi");
  try {
    const getallFileCategories = await FileCategory.find();
    res.json(getallFileCategories);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createFileCategory,
  updateFileCategory,
  deleteFileCategory,
  getFileCategory,
  getallFileCategories,
};
