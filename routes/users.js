const router = require("express").Router();
const User = require("../models/User");
const { isAuthenticated } = require("../middlewares/jwt");
const ErrorResponse = require("../utils/error");
const fileUploader = require("../config/cloudinary.config");

// @desc    Edit a user
// @route   PUT /api/v1/users/edit
// @access  Private
router.put("/edit", isAuthenticated, async (req, res, next) => {

  const id = req.payload._id;
  const {
    email,
    fullName,
    profileImage,
    profession,
    location,
    headLine,
    about,
    contactInfo,
  } = req.body;

  // Check if the mandatory fields are provided as empty string
  if (email === "" || fullName === "" || profession === "" || location === "") {
    return next(
      new ErrorResponse("Please fill all mandatory fields to register", 400)
    );
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorResponse("Email is not a valid format", 400));
  }

  // Use regex to validate the fullname format
  const fullNameRegex =
    /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
  if (!fullNameRegex.test(fullName)) {
    return next(
      new ErrorResponse(
        "You must write your name and your surname separate by a space",
        400
      )
    );
  }

  //Only is allowed three links for social media networks
  if (contactInfo.split(",").length - 1 > 2) {
    return next(
      new ErrorResponse("Maximun number of social media links is 3", 400)
    );
  }
  //Check Url correct format and url must be separated by commas
  const contactInfoRegex =
    /^$|^[a-z0-9@:%_.~#?&//=-]+(,[a-z0-9@:%_.~#?&//=-]+)*$/i;
  const contactInfoUrlRegex =
    /^$|[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
  if (!contactInfoRegex.test(contactInfo)) {
    return next(
      new ErrorResponse(
        "Links must be separate by comma and no spaces. Last char can not be a comma. Special chars like quotes are invalid",
        400
      )
    );
  }
  if (!contactInfoUrlRegex.test(contactInfo)) {
    return next(
      new ErrorResponse(
        "Url invalid format! - Example: https://www.instagram.com/user",
        400
      )
    );
  }

  try {

    const userInDB = await User.findOne({ email });
    if (userInDB) {
      return next(
        new ErrorResponse(`User already exists with email ${email}`, 400)
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        fullName,
        profileImage,
        profession,
        location,
        headLine,
        about,
        contactInfo,
      },
      { new: true }
    );

    res.status(202).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }


});

// @desc    Get user enumValues
// @route   GET /api/v1/users/enum-values
// @access  Public
router.get("/enum-values", async (req, res, next) => {
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
// @route   POST /api/v1/users/edit-upload
// @access  Private
router.post(
  "/edit-upload",
  isAuthenticated,
  fileUploader.single("profileImage"),
  (req, res, next) => {
    if (!req.file) {
      next(new ErrorResponse("Error uploading the image", 500));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

// @desc    Get all data related to the current authenticated user
// @route   GET /api/v1/user/logged-in-user
// @access  Private
router.get('/logged-in-user', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) {
      next(new ErrorResponse('No user found', 404));
      return;
    }
    const publicUser = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profileImage: user.profileImage,
      profession: user.profession,
      location: user.location,
      headLine: user.headLine,
      about: user.about,
      contactInfo: user.contactInfo,
    }
    console.log(publicUser)
    res.status(200).json({ data: publicUser })
  } catch (error) {
    next(error);
  }
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
      _id: user._id,
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
