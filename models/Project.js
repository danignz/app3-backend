const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    collaborators: [
      {
        rol: {
          type: String,
          enum: [
            "Web Developer",
            "UX/UI Designer",
            "Data Analyst",
            "Cybersecurity Analyst",
          ],
          required: [true, "Rol is required"],
        },
        quantity: {
          type: Number,
          default: 0,
        },
        users: {
          type: [Schema.Types.ObjectId],
          ref: "User",
        },
        _id: false,
      },
    ],
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    projectImage: {
      type: String,
      default: "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663150913/app3-project/projectspictures/defaultproject_zojuvf.png",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    projectUrl: {
      type: String,
    },
    onCampus: {
      type: Boolean,
    },
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", projectSchema);
