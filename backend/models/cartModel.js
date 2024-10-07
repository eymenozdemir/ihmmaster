const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Product"
    },
    quantity: {
      type: Number,
      required: true
    },
    setup: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    price: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
