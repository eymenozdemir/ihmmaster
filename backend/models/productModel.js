const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    vendor: {
      type: String,
    },
    SKU: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    size: {
      type: String,
    },
    caseQuantity: {
      type: Number,
    },
    caseUnit: {
      type: String,
      default: "N/A",
    },
    casePallet: {
      type: Number,
      default: 0,
    },
    stockNashville: {
      type: Number,
      default: 0
    },
    stockSavannah: {
      type: Number,
      default: 0
    },
    stockAtlanta: {
      type: Number,
      default: 0,
    },
    toNashville: {
      type: Number,
      default: 0
    },
    toSavannah: {
      type: Number,
      default: 0
    },
    toAtlanta: {
      type: Number,
      default: 0,
    },
    stockTr: {
      type: Number,
      default: 0,
    },
    stockTreshold: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      default: 0,
    },
    saleFreq: {
      type: Number,
      default: 0,
    },
    lastSale: {
      type: Date,
      default: Date.now(),
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
