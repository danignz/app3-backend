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
  
      let user_img;
      if (req.file) {
        user_img = req.file.path;
      } else {
        user_img = existingImage;
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            profileImage: user_img,
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