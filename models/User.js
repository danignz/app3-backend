const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required."],
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662751695/app3-project/profiledefault_c7ofd5.png",
    },
    profession: {
      type: String,
      enum: ["Web Developer", "UX/UI Designer", "Data Analyst", "Cybersecurity Analyst"],
      required: [true, "Profession is required"],
    },
    location: {
      type: String,
      enum: ["Amsterdam", "Barcelona", "Berlin", "Lisbon", "London", "Madrid", "Mexico City", "Miami", "Paris", "São Paulo", "Remote"],
      required: [true, "Location is required"],
    },
    headLine: {
      type: String,
    },
    about: {
      type: String,
    },
    contactInfo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
