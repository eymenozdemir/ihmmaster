const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var saleSchema = new mongoose.Schema(
  {
    invoiceId: {
        type: String,
        required: true
    },
    soldItems: [
      {
        title: {
          type: String,
          required: true
        },
        items: {
            type: String,
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
    date: {
      type: String,
      required: true
    },
    subtotalPrice: {
      type: Number,
      required: true
    },
    taxPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    billTo: {
      type: String,
    },
    shipTo: {
      type: String,
      required: true
    },
    shipvia: {
      type: String,
    },
    branch: {
      type: String,
    },
    rep: {
      type: String,
    },
    job: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Sale", saleSchema);
