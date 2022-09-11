const router = require("express").Router();
const Request = require("../models/Request");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");

// @desc    Get all requests
// @route   GET /api/v1/requests/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const requests = await Request.find({});
    if (!requests.length) {
      return next(new ErrorResponse("No requests found", 404));
    }
    res.status(200).json({ data: requests });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single request
// @route   GET /api/v1/requests/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
    }
    res.status(200).json({ data: request });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a request
// @route   POST /api/v1/requests/:id
// @access  Private
router.post("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const user = req.payload._id;
  const status = "Pending";

  try {
    const request = await Request.create({ user, project: id, status });
    if (!request) {
      return next(
        new ErrorResponse("An error ocurred while creating the request", 500)
      );
    }
    res.status(201).json({ data: request });
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a request
// @route   PUT /api/v1/requests/:id
// @access  Private
router.put("/:id", isAuthenticated, isOwner("request"), async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
    } else {
      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.status(202).json({ data: updatedRequest });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a request
// @route   DELETE /api/v1/requests/:id
// @access  Private
router.delete("/:id", isAuthenticated, isOwner("request"), async (req, res, next) => {
    const { id } = req.params;
    try {
      const request = await Request.findById(id);
      if (!request) {
        return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
      } else {
        const deleted = await Request.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
