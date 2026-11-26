
const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    dateFound: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);
