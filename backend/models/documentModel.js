const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    file: {
        type: Array,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"FileCategory",
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required: true,
      },
    vessel: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Vessel",
    },
    uploadDate: {
      type: Date,
      default: Date.now(),
    },
    statusDate: {
      type: Date,
      default: Date.now(),
    },
    documentStatus: {
      type: String,
      default: "New Upload"
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Document", documentSchema);