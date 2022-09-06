const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: ["Pending", "Denied", "Accepted"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Request", requestSchema);
