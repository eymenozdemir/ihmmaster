const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var companySchema = new mongoose.Schema(
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
    email: {
        type: String,
    },
    number: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Company", companySchema);
