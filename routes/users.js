const router = require("express").Router();
const User = require("../models/User");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");
const ErrorResponse = require("../utils/error");
const fileUploader = require("../config/cloudinary.config");

// @desc    Edit a user
// @route   PUT /api/v1/users/:id
// @access  Private
router.put(
  "/:id",
  isAuthenticated,
  isOwner("user"),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      fullName,
      profileImage,
      profession,
      location,
      headLine,
      about,
      contactInfo,
      existingImage,
    } = req.body;

    let profileImg;
    if (profileImage) {
      profileImg = profileImage;
    } else {
      profileImg = existingImage;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          fullName,
          profileImage: profileImg,
          profession,
          location,
          headLine,
          about,
          contactInfo,
        },
        { new: true }
      );

      req.payload = {
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        _id: updatedUser._id,
        profileImage: updatedUser.profileImage,
        profession: updatedUser.profession,
        location: updatedUser.location,
      };

      res.status(202).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Get user enumValues
// @route   GET /api/v1/users/enumValues
// @access  Public
router.get("/enumvalues", async (req, res, next) => {
  let enumValuesProfession = (enumValuesLocation = null);

  enumValuesProfession = User.schema.path("profession").enumValues;
  enumValuesLocation = User.schema.path("location").enumValues;

  const enumValues = {
    profession: enumValuesProfession,
    location: enumValuesLocation,
  };

  if (enumValuesProfession && enumValuesLocation) {
    res.status(200).json({ data: enumValues });
  } else {
    return next(new ErrorResponse(`Can not access enumValues DB`, 404));
  }
});

// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/users/editupload
// @access  Private
router.post("/editupload", isAuthenticated, fileUploader.single("profileImage"), (req, res, next) => {
  if (!req.file) {
    next(new ErrorResponse('Error uploading the image', 500));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse(`User not found by id: ${id}`, 404));
    }
    const publicUser = {
      email: user.email,
      fullName: user.fullName,
      profileImage: user.profileImage,
      profession: user.profession,
      location: user.location,
      headLine: user.headLine,
      about: user.about,
      contactInfo: user.contactInfo,
    };
    res.status(200).json({ data: publicUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
