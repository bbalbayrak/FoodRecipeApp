const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    includes: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      ref: "User",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
