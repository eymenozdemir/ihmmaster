const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var vesselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    IMO: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required: true,
      },
    type: {
        type: String,
    },
    year: {
        type: String,
    },
    flag: {
        type: String,
    },
    tonnage: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Vessel", vesselSchema);
