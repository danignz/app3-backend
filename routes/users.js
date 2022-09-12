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
  fileUploader.single("profileImage"),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      fullName,
      profession,
      location,
      headline,
      about,
      contactInfo,
      existingImage,
    } = req.body;

    let profileImg;
    if (req.file) {
      profileImg = req.file.path;
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
          headline,
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
      headline: user.headline,
      about: user.about,
      contactInfo: user.contactInfo,
    }
    res.status(200).json({ data: publicUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
