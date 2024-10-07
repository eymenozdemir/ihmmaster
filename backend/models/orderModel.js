const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderedItems: [
      {
        title: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        SKU: {
          type: String,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    totalPrice: {
      type: Number,
      required: true
    },
    location: {
      type: String,
    },
    destination: {
      type: String,
      required: true
    },
    statusDate: {
      type: Date,
      default: Date.now(),
    },
    orderStatus: {
      type: String,
      default: "Products Ordered"
    },
    containerCode: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
