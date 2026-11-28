const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
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
    dateLost: {
      type: Date,
      required: true
    },
    color: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Lost"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostItem", lostItemSchema);