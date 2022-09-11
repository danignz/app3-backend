const router = require("express").Router();
const User = require("../models/User");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");
const fileUploader = require("../config/cloudinary.config");

// @desc    Edit a user
// @route   PUT /api/v1/users/:id
// @access  Private
router.put("/:id", isAuthenticated, isOwner("user"), fileUploader.single("profileImage"), async (req, res, next) => {
      const { id } = req.params;
      const { existingImage } = req.body;
  
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
            profileImage: profileImg,
          },
          { new: true }
        );
        res.status(202).json({ data: updatedUser });
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;