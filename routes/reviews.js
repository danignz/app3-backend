const router = require("express").Router();
const Review = require("../models/Review");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");

// @desc    Get all reviews
// @route   GET /api/v1/reviews/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const reviews = await Review.find({})
      .populate("user")
      .populate("project")
      .populate({
        path: "project",
        populate: {
          path: "leader",
          model: "User",
        },
      })
      .populate({
        path: "project",
        populate: {
          path: "collaborators.users",
          model: "User",
        },
      });

    if (!reviews.length) {
      return next(new ErrorResponse("No reviews found", 404));
    }
    res.status(200).json({ data: reviews });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id)
      .populate("user")
      .populate("project")
      .populate({
        path: "project",
        populate: {
          path: "leader",
          model: "User",
        },
      })
      .populate({
        path: "project",
        populate: {
          path: "collaborators.users",
          model: "User",
        },
      });

    if (!review) {
      return next(new ErrorResponse(`Review not found by id: ${id}`, 404));
    }
    res.status(200).json({ data: review });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a review
// @route   POST /api/v1/reviews/:projectId
// @access  Private
router.post("/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;
  const user = req.payload._id;

  const { title, comment, puntuation } = req.body;

  // Check if the mandatory fields are provided as empty string
  if (title === "" || comment === "" || puntuation === "") {
    return next(new ErrorResponse("Please fill all mandatory fields", 400));
  }

  const parsePuntuation = parseInt(puntuation);

  try {
    const review = await Review.create({
      user,
      project: projectId,
      title,
      comment,
      puntuation: parsePuntuation,
    });
    if (!review) {
      return next(
        new ErrorResponse("An error ocurred while creating the review", 500)
      );
    }
    res.status(201).json({ data: review });
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
router.put(
  "/:id",
  isAuthenticated,
  isOwner("review"),
  async (req, res, next) => {
    const { id } = req.params;
    const { title, comment, puntuation } = req.body;

    // Check if the mandatory fields are provided as empty string
    if (title === "" || comment === "" || puntuation === "") {
      return next(new ErrorResponse("Please fill all mandatory fields", 400));
    }

    const parsePuntuation = parseInt(puntuation);

    try {
      const review = await Review.findById(id);
      if (!review) {
        return next(new ErrorResponse(`Review not found by id: ${id}`, 404));
      } else {
        const updatedReview = await Review.findByIdAndUpdate(
          id,
          { title, comment, puntuation: parsePuntuation },
          { new: true }
        );
        res.status(202).json({ data: updatedReview });
      }
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
router.delete(
  "/:id",
  isAuthenticated,
  isOwner("review"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id);
      if (!review) {
        return next(new ErrorResponse(`Review not found by id: ${id}`, 404));
      } else {
        const deleted = await Review.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
