const Document = require("../models/documentModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createDocument = asyncHandler(async (req, res) => {
  try {
    const newDocument = await Document.create(req.body);
    res.json(newDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const updateDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req);
  validateMongoDbId(id);
  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const updateDocumentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedDocument = await Document.findByIdAndDelete(id);
    res.json(deletedDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const getDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaDocument = await Document.findById(id);
    res.json(getaDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const getallDocuments = asyncHandler(async (req, res) => {
  try {
    const getallDocuments = await Document.find().populate("company").populate("vessel").populate("type");
    res.json(getallDocuments);
  } catch (error) {
    throw new Error(error);
  }
});

const getDocumentsByCompany = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const getallDocuments = await Document.find({ company: id }).populate("company").populate("vessel").populate("type");
    res.json(getallDocuments);
  } catch (error) {
    throw new Error(error);
  }
});

const getDocumentsByVessel = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const getallDocuments = await Document.find({ vessel: id }).populate("company").populate("vessel").populate("type");
    res.json(getallDocuments);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createDocument,
  updateDocument,
  updateDocumentStatus,
  deleteDocument,
  getDocument,
  getallDocuments,
  getDocumentsByCompany,
  getDocumentsByVessel,
};
